var exec = require('child_process').exec;

module.exports.load = function() {
    var deferred = Promise.defer();
    exec('./test/fixtures.sh',
        function(error, stdout, stderr) {
            if (error)
                console.error(error);
            if (stderr)
                console.error(stderr);

            deferred.resolve();
        });
    return deferred.promise;
};
