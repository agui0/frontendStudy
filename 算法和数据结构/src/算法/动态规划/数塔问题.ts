/**
 * 数塔问题
 *
 * 从数塔的顶层出发，在每一个节点可以选择向左或者向右走，一直走到最底层，要求找出一条路径，使得路径上的数值和最大。
 * */

class RandomNumTower {
    public tower: number[][] = [];
    public maxAdd: number[][] = [];
    public path: number[][] = [];

    constructor(public size: number) {
        this.generateRandomNumTower();
        this.print(this.tower);
        this.programming(this.maxAdd, this.path, this.tower);
    }

    private generateRandomNumTower() {
        for (let i = this.size - 1; i >= 0; i--) {
            this.tower[i] = new Array(i + 1).fill("").map(() => ~~(Math.random() * 100))
        }
    }

    private programming(maxAdd: number[][], path: number[][], tower: number[][]) {
        let size = tower.length;
        maxAdd[size - 1] = [];// 行初始化
        tower[size - 1].forEach((v, i) => {
            maxAdd[size - 1][i] = v;
        });

        for (let i = size - 2; i >= 0; i--) {
            maxAdd[i] = [];// 行初始化
            path[i] = [];
            tower[i].forEach((_, index) => {
                let max = maxAdd[i + 1][index] > maxAdd[i + 1][index + 1];
                maxAdd[i][index] = tower[i][index] + (max ? maxAdd[i + 1][index] : maxAdd[i + 1][index + 1]);
                path[i][index] = max ? index : index + 1;
            })
        }
        this.print(maxAdd);
        this.print(path);
        this.printPath(path);
    }

    print(tower: number[][]) {
        tower.forEach(level => {
            console.log(`${level}`);
        })
    }

    printPath(path:number[][]){
        path.reduce((last, curr)=>{
            console.log(curr[last]);
            return curr[last];
        },0)
    }
}

new RandomNumTower(5);
