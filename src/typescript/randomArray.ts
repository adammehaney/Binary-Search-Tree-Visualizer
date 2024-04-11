function shuffleArray(array: Array<number>): Array<number> {
    // Fisher–Yates shuffle
    // Credit: https://forum.freecodecamp.org/u/DanCouper
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
export function randomArray(length: number): Array<number> {
    let nums = [];
    for (let i = 0; i < length; i++) {
        nums.push(Math.ceil(Math.random()*100))
    }
    return shuffleArray(nums);
}