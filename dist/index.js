'use strict';

/*
* @Author: Shenpeng
* @Date:   2017-04-11 16:41:58
 * @Last Modified by: shenpeng
 * @Last Modified time: 2018-04-15 10:40:49
*/

var main = {
    chessBoard: [], //棋盘点
    winPoints: [], //可以获胜的点
    /**
     * 初始化
     */
    dataInit: function dataInit() {
        document.querySelector('.confirmBtn').onclick = function () {
            var gridValues = document.querySelectorAll('.grid'),
                valueArr = [],
                checkRole = document.querySelector('.checkRole').value;
            for (var i = 0; i < gridValues.length; i++) {
                if (gridValues[i].value.trim()) {
                    valueArr.push(gridValues[i].value);
                } else {
                    alert('请输入完整棋盘');return;
                }
            }
            if (!checkRole.trim()) {
                alert('请输入验证角色');return;
            }
            main.chessBoard = [];
            for (var _i = 0; _i < valueArr.length; _i += 3) {
                main.chessBoard.push(valueArr.slice(_i, _i + 3));
            }
            if (main.winsCheck(checkRole, main.chessBoard) == 1) {
                console.log(main.winPoints);
                return main.winPoints;
            } else {
                console.log(main.arrRepeat(main.winPoints));
                return main.arrRepeat(main.winPoints);
            }
        };
    },

    /**
     * 井字棋赢法判断
     * @param {待验证角色} role 
     * @param {待验证数组} arr 
     */
    winsCheck: function winsCheck(role, arr) {
        for (var x = 0; x < arr.length; x++) {
            for (var y = 0; y < arr.length; y++) {
                // 检查横向
                if (arr[x][y] != 'e' && arr[x][0] == role && arr[x][0] == arr[x][1] && arr[x][0] == arr[x][2]) {
                    //匹配成功
                    return 1;
                } else {
                    //匹配失败
                    if (arr[x][y] == 'e' && arr[x][0] == role && arr[x][0] == arr[x][1] && arr[x][0] != arr[x][2]) {
                        main.winPoints.push([x, y]);
                    }
                    if (arr[x][y] == 'e' && arr[x][0] == role && arr[x][0] != arr[x][1] && arr[x][0] == arr[x][2]) {
                        main.winPoints.push([x, y]);
                    }
                    if (arr[x][y] == 'e' && arr[x][1] == role && arr[x][0] != arr[x][1] && arr[x][1] == arr[x][2]) {
                        main.winPoints.push([x, y]);
                    }
                }

                // 检查纵向
                if (arr[x][y] != 'e' && arr[0][y] == role && arr[0][y] == arr[1][y] && arr[0][y] == arr[2][y]) {
                    //匹配成功
                    return 1;
                } else {
                    //匹配失败
                    if (arr[x][y] == 'e' && arr[0][y] == role && arr[0][y] == arr[1][y] && arr[0][y] != arr[2][y]) {
                        main.winPoints.push([x, y]);
                    }
                    if (arr[x][y] == 'e' && arr[0][y] == role && arr[0][y] != arr[1][y] && arr[0][y] == arr[2][y]) {
                        main.winPoints.push([x, y]);
                    }
                    if (arr[x][y] == 'e' && arr[1][y] == role && arr[0][y] != arr[1][y] && arr[1][y] == arr[2][y]) {
                        main.winPoints.push([x, y]);
                    }
                }

                // 检查 \ 斜向
                if (x == y) {
                    if (arr[0][0] != 'e' && arr[0][0] == role && arr[0][0] == arr[1][1] && arr[0][0] == arr[2][2]) {
                        //匹配成功
                        return 1;
                    } else {
                        //匹配失败
                        if (arr[0][0] == 'e' && arr[1][1] == role && arr[1][1] == arr[2][2]) {
                            main.winPoints.push([0, 0]);
                        }
                        if (arr[0][0] == role && arr[1][1] == 'e' && arr[0][0] == arr[2][2]) {
                            main.winPoints.push([1, 1]);
                        }
                        if (arr[0][0] == role && arr[0][0] == arr[1][1] && arr[2][2] == 'e') {
                            main.winPoints.push([2, 2]);
                        }
                    }
                }

                // 检查 / 反斜向
                if (x == 0 && y == 2 || x == 1 && y == 1 || x == 2 && y == 0) {
                    if (arr[0][2] != 'e' && arr[0][2] == role && arr[0][2] == arr[1][1] && arr[0][2] == arr[2][0]) {
                        return 1;
                    } else {
                        if (arr[0][2] == 'e' && arr[1][1] == role && arr[1][1] == arr[2][0]) {
                            main.winPoints.push([0, 2]);
                        }
                        if (arr[0][2] == role && arr[1][1] == 'e' && arr[0][2] == arr[2][0]) {
                            main.winPoints.push([1, 1]);
                        }
                        if (arr[0][2] == role && arr[0][2] == arr[1][1] && arr[2][0] == 'e') {
                            main.winPoints.push([2, 0]);
                        }
                    }
                }
            }
        }
    },

    /**
     * 二维数组去重
     * @param {待去重数组} arr
     */
    arrRepeat: function arrRepeat(arr) {
        var obj = {};
        var newArr = [];
        arr.map(function (value) {
            var item = value.toString();
            if (obj[item] !== item) {
                obj[item] = item;
                newArr.push(value);
            }
        });
        return newArr;
    },

    /**
     * 去除字符串前后空格
     */
    trim: function trim() {
        if (!String.prototype.trim) {
            String.prototype.trim = function () {
                return this.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "");
            };
        }
    },
    _init: function _init() {
        main.trim();
        main.dataInit();
    }
};
main._init();
