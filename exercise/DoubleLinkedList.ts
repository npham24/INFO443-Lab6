import { ListNode } from './ListNode'

export class DoubleLinkedList {
    head: ListNode;
    tail: ListNode;
    length: number;
    
    constructor () {
        this.length = 0;
        // give the node dummy value but this is supposed to be empty for head and tail
        this.head = new ListNode(0, 0);
        this.tail = new ListNode(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    
    // Adding a node at the front of the list 
    public push(node: ListNode) 
    { 
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
        this.length++;
    } 
    
    // remove a given node in O(1)
    public remove(node: ListNode) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    // remove the node at the back of the list
    public removeBack() {
        let tailNode: ListNode = this.tail.prev;
        this.remove(tailNode);
        this.length--;
        
        return tailNode;
    }
    
    public size(): number {
        return this.length;
    }
    
    // print the list for debugging
    // list will be in the form of 0 val val val val val 0 
    // because we declared the head and tail to be 0
    public printList() {
        let curr: ListNode = this.head;
        while (curr != null) {
            console.log(curr.val + " ");
            curr = curr.next;
        }
        console.log();
    }
}