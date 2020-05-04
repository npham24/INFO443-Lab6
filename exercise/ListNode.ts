export class ListNode {
    next: ListNode;
    prev: ListNode;
    key: number;
    val: number;


    constructor(key: number, val: number) {
        this.key = key;
        this.val = val;
    }
}

