function numSort(a, b) {
	if (a == b) {
		return 0;
	}

	return a > b ? 1 : -1;
}

Array.prototype.contains = function(item) {
	for (var i = 0; i<this.length; i++) {
		if (this[i] == item) {
			return true;
		}
	}
	return false;
};

Array.prototype.insert = function(array) {
	array.forEach((item) =>{
		this.push(item);
	})

	return this;
};

function isPrime(number){
	if (number == 0) {
		return false;
	}

	if (number == 1) {
		return true;
	}

	for (var i = 2; i < number; i ++) {
		if ((number % i) == 0) {
			return false;
		} 
	}

	return true;
}// returns boolean
console.log(isPrime(0));
console.log(isPrime(1));
console.log(isPrime(71));
console.log(isPrime(123));
console.log(isPrime(2300000023000000));

function removeDuplicate(array) {
	let final = []
	array.forEach(function(item){
		if (!final.contains(item)){
			final.push(item);
		}
	});
	return final;
}// returns array without duplicate
console.log(removeDuplicate([1,1,1,1,1,1, 12, 222, 2, 2, 1]));

function merge(array1, array2) {
	return array1
		.insert(array2)
		.sort(numSort)
}// return sorted array with values of array1 and array 2
console.log(merge([1, 13, 234, 12, 123], [77, 4, 55, 1, 3243, 4]));

function areAnagram(string1, string2) {
	return string1.split("").sort().join() == string2.split("").sort().join()
}// return boolean if the too string are anagrams

console.log(areAnagram("julien", "neiluj"));
console.log(areAnagram("abc", "rty"));
console.log(areAnagram("bonjour", "roubonj"));


