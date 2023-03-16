

const levelArr = [
    [0, 0.3],
    [0.3, 1.6],
    [1.6, 3.4],
    [3.4, 5.5],
    [5.5, 8.0],
    [8.0, 10.8],
    [10.8, 13.9],
    [13.9, 17.2],
    [17.2, 20.8],
    [20.8, 24.5],
    [24.5, 28.5],
    [28.5, 32.7],
    [32.7, 36.9]
];

// https://baike.baidu.com/item/%E9%A3%8E%E5%8A%9B%E7%AD%89%E7%BA%A7%E8%A1%A8/9218619
export const getWindLevel = (speed = 0) => {
    for (let i = 0; i <= levelArr.length; i++) {
        let [min, max] = levelArr[i];
        if (min <= speed && speed < max) {
            return i;
        }
    }
}
