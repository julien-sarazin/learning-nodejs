module.exports = (api) => {
    const Car = api.models.Car;
    const User = api.models.User;

    function create(req, res, next) {
        let car = new Car(req.body);
        car.save()
            .then(res.prepare(201))
            .catch(res.prepare(500));
    }

    function list(req, res, next) {
        Car.find()
            .then(res.prepare(200))
            .then(res.prepare(500));
    }

    function show(req, res, next) {
        Car.findById(req.params.id)
            .then(res.prepare(200))
            .catch(res.prepare(500));
    }

    function update(req, res, next) {
        Car.findByIdAndUpdate(req.params.id, req.body)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    function remove(req, res, next) {
        Car.findByIdAndRemove(req.params.id)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    function rent(req, res, next) {
        let carId = req.params.id;
        let userId = req.userId;

        let car = null;
        let user = null;

        findCar()
            .then(ensureOne)
            .then(findUser)
            .then(ensureOne)
            .then(update)
            .then(res.prepare(204))
            .catch(res.prepare(404));

        function findCar() {
            return Car.findById(carId)
                .then(set);

            function set(data) {
                return car = data;
            }
        }

        function findUser() {
            return User.findById(userId)
                .then(set);

            function set(data) {
                return user = data;
            }
        }

        function update() {
            car.renters.push(userId);
            user.rent = carId;

            return car.save()
                .then(saveUser);

            function saveUser() {
                return user.save();
            }
        }

        function ensureOne(data) {
            return (data) ? data : Promise.reject('not.found');
        }
    }

    function back(req, res, next) {
        let car = null;
        let user = null;

        findUser()
            .then(ensureCarRented)
            .then(ensureCarExist)
            .then(update)
            .then(res.prepare(204))
            .catch(res.error);

        function findUser() {
            return User.findById(req.userId)
                .then(set);

            function set(instance) {
                return user = instance;
            }
        }

        function ensureCarRented(user) {
            return (user.rent) ? user.rent : Promise.reject({code: 403, reason: 'No car rented'})
        }

        function ensureCarExist(carId) {
            return Car.findById(carId)
                .then(ensureOne)
                .then(set);

            function ensureOne(car) {
                return (car) ? car : Promise.reject({code: 404, reason: 'Rented car not found'});
            }

            function set(instance) {
                car = instance;
            }
        }

        function update() {
            return updateCar()
                .then(updateUser);

            function updateCar() {
                car.renters.remove(req.userId);
                return car.save();
            }

            function updateUser() {
                user.rent = undefined;
                return user.save();
            }
        }
    }

    return {
        create,
        list,
        show,
        update,
        remove,
        rent,
        back
    };
};
