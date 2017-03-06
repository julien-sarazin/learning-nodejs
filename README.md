# Introduction
### 1 - Variables en `var`

Lorsque l'on veut déclarer une variable en javascript on utilise souvent le mot clé `var`.

```javascript
var a = 10;
```

Exemple trivial ici, nous avons déclaré une variable `a` et assigné la valeur 10.
On peut faire exactement la même chose à l'intérieur d'une fonction.

```javascript
function f() {
    var message = "Hello, world!";

    return message;
}
```

Et nous pouvons également passez ces variables au travers d'autres fonctions :

```
function f() {
    var a = 10;
    return function g() {
        var b = a + 1;
        return b;
    }
}

var g = f();
g(); // returns '11'
```

Dans l'exemple ci-dessus la function `g` a **capturé** la variable déclaré dans `f`. 
À tout point où `g` est appelé, la valeur de `a` sera liée à la valeur de `a` dans `f`. Même si `g` est appelé une fois `f` est fait en cours d'exécution, il sera en mesure d'accéder et de modifier `a`.

```javascript
function f() {
    var a = 1;

    a = 2;
    var b = g();
    a = 3;

    return b;

    function g() {
        return a;
    }
}

f(); // returns '2'
```

La déclaration en `var`a des comportement spécifiques:

```javascript
function f(shouldInitialize) {
    if (shouldInitialize) {
        var x = 10;
    }

    return x;
}

f(true);  // returns '10'
f(false); // returns 'undefined'

```

Certains lecteurs pourraient faire une double prise à cet exemple. La variable x a été déclarée dans le bloc if, et pourtant nous avons pu y accéder depuis l'extérieur de ce bloc. C'est parce que les déclarations var sont accessibles n'importe où dans leur fonction contenant, module, espace de noms ou étendue globale - tout ce que nous allons passer plus tard - indépendamment du bloc contenant.

Le soucis avec ce genre de flexibilité, c'est qu'une erreur est vite arrivée : 

``` javascript
function sumMatrix(matrix) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }

    return sum;
}
``` 

Quel est le probleme?
Ici une redélcaration de la variable i fausse l'algorithm de calcul. Ce genre d'erreur n'est pas simple à trouver, et peut dans certain cas, être grand source de frustration!

Essayer de deviner ce que ce code va produire : 

```javascript
for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
```

Pour ceux qui ne sont pas familier avec les function de javascript `setTimeout` va executer la fonction **une fois** après un temps `T` (milliseconds) passé en second paramètre.


Prêt? Essayez!

```
// #1
0
1
2
3
4
5
6
7
8
9
```
Est ce à quoi vous vous attendiez n'est-ce pas?

```
// #2
10
10
10
10
10
10
10
10
10
10
```

Qu'est ce qui se passe ici? La function `setTimeout( __func, delay ) ` prend une reference de fonction en premier paramètre, puis un delay en second. Lorsque setTimeout est exécuté, elle ne déclenchera la fonction qui lui est passé en paramètre que dans T ms, la boucle for aura déjà terminé de s'executé et i sera déjà à 10.


> Exercice

Trouvez une solution en modifiant le code suivant pour que sont résultat match avec le panel `#1`.

```javascript
for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
```


### 2 - Variables en `let`

La déclaration/assignation est identique.

```javascript
let a = 10;
```

Le scope

```javascript
function f(input) {
    let a = 100;

    if (input) {
        // Still okay to reference 'a'
        let b = a + 1;
        return b;
    }

    // Reference Error: 'b' doesn't exist here
    return b;
}
```

L'ordre

```javascript
a++
let a = 1;  // Error

b++ 
var b = 2; // Exist globalement
```  

Règle de capture.

``` javascript
function foo() {
    // okay to capture 'a'
    return a;
}

// illegal call 'foo' before 'a' is declared
// runtimes should throw an error here
foo();

let a;
```


Re-definission

```javascript
let x = 10;
let x = 20; // error: can't re-declare 'x' in the same scope
```

Block scope vs. function scope
Deux niveaux de déclaration sont possibles, la déclaration dite de block scope, qui a une portée global dans ce qui sera défini à l'intérieur de celui-ci, et une déclaration de function scope qui de la même façon aura une portée global à l'interieur de la fonction. 

Les deux déclaration ne sont pas exclusives, exemple : 

```javascript
function f(condition, x) { // function scope
    if (condition) {
        let x = 100; // block scope
        return x;
    }

    return x;
}

f(false, 0); // returns '0' from the function scope
f(true, 0);  // returns '100' from the block scope.
```


### 3 - Variables en `const`

La déclaration/assignation est identique.

```javascript
const a = 10;
```

Pour faire simple, les variables `const` ont les mêmes propriétés que les variables `let` à la différence qu'une variable déclaré const ne peut être altérée.



```javascript
const foo = {
    name: 'bar',
    hobby: 'baz'
};

foo = { // error because we're trying to change the address of `foo`
    name: 'baz'
    hobby: 'bar'
}

// OK
foo.name = 'baz' 
foo.hobby = 'bar'
```


- Règles d'utilisation de `let` vs `const` :  
La règle est simple, lorsque vous utilisez une variable classique qui a vocation à être altérée pendant sa durée de vie, utilisez `let`. Si au contraire, la référence défini ne doit jamais être modifiée, utilisez `const`.

### 4 - Copie vs. Reference
Petit rappel important, lorsque vous échanger des valeurs entre variables, tout type primitif (`string`, `number`, `boolean`, `null`, `undefined`) sera passé par copie, tout type complexe (`array`, `object`, `function`) sera passé par référence.

Exemple avec des primitives

```javascript
var foo = 1;
var bar = foo;

bar = 9;

console.log(foo, bar); // => 1, 9
```

Exemple avec des types complexes

```javascript
var foo = [1, 2];
var bar = foo;

bar[0] = 9;

console.log(foo[0], bar[0]); // => 9, 9
``` 

### 5 - Fonctions

Le mot clé `function` en javascript à été pendant des années l'instruction la plus utilisée, elle permettait de finir un block d'instruction invocable anonymement, ou nommé, référencé par une variable, et même de définir des classes.


```javascript
// Named function
function foo(bar) {
    console.log(bar)
}

foo("Hello world");

// Anonymous function 
const baz = function(bim) {
    foo("Hello " + bim)
}

baz(" =)")

/** 
Here @success and @error are callbacks, meaning that we know from the implementation   
that at least one of them will be invoked. Since they are "referenced" from the  
function, they are, by definition, accessible anywhere inside the function.
*/
const callback = function(condition, error, success) {
    if (condition) {
        return success(null, condition);
    }
    
    return error(condition);
}

callback(true, function() { console.log("error") }, function() { console.log("success"));

callback(false, function() { console.log("error") }, function() { console.log("success"));

/** Class definition.
Nothing except the convention tells us that this function represent a class. 
As you will notice in javascript, most of the time, rule are not defined by the
language itself, which is very permissive, but rather by the conventions
from the developer community
*/ 
function User(name, age) {
    if (!name || !age) {
        return;
    }
    
    this.name = name;
    this.age = age;
}

User.prototype = {
    name: 'unkown',
    age: 0
};

let user = User();
```




### 6 - Arrow functions

Les function de type "Arrow function" offre une syntax plus symbolique et donc plus efficace.

Exemple :

```javascript
var foo = (bar) => {
    console.log("Hello " + bar);
}
```

Premiere différence, la "arrow function" ne peut pas être nommée
 
```javascript
foo(bar) => { // invalid declaration
    console.log("Hello " + bar);
}
```

Seconde différence, la "arrow function" ne possède pas de prototype

```javascript
var Toto = () => {}
console.log(Toto.prototype);
```

Enfin, la plus importante car cela à été une des raisons principales de la création des "arrow function", **la capture de this**.



Ce qui nous amène à notre dernier point avant de commencer à jouer avec NodeJS.



### 7 - Who is this?
L'utilisation de `this` dans les paradigmes de programmation objet est omniprésente. On utilise généralement this pour référencer l'instance en cours qui est lu ou altérée.


```javascript
function User(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
}

User.prototype = {
    firstname: "unkown",
    lastname: "unkown"
};

User.prototype.sayHello = function(name) {
    console.log(`Hello ${name}, i'm ${this.firstname}`)
}

User.prototype.sayHelloBis = (name) => {
    console.log(`Hello ${name}, i'm ${this.firstname}`)
}

var user = new User("Foo", "Bar");

user.sayHello("Baz"); // Hello Baz, i'm Foo
user.sayHelloBis("Baz"); // Hello Baz, i'm undefined
```

Dans l'exemple ci-dessus on se rend compte que l'utilisation de la "arrow function" n'est peut-être pas très apropriée.

Prenons un nouvel exemple où nous mettrons en avant l'avantage de la "arrow function".

```javascript
function User() {
    this.age = 0;

    setInterval(function() {
        this.age ++;
        console.log(`I am older now! ${this.age} years old!`);
    }, 1000)
}

var user = new User();

function ArrowUser() {
    this.age = 0;

    setInterval(() => {
        this.age ++;
        console.log(`I am older now! ${this.age} years old!`);
    }, 1000)
}

var user = new ArrowUser();
```

Ici nous constatons que this à bien été capturé par la arrow function lors de sa définition. Pour résumer

- Arrow Function:   `This` est défini lors de l'évaluation de la fonction.
- Classic Function: `This` est défini lors de l'execution de la fonction.






