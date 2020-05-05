import { ListNode } from './ListNode';
import { DoubleLinkedList } from './DoubleLinkedList';
import { MyCache } from './MyCache';

class LRUCache implements MyCache {
    private list: DoubleLinkedList;
    private nodeMap: Map<number, ListNode>;
    
    constructor(private capacity: number) {
        // double linked list
        this.list = new DoubleLinkedList();
        this.nodeMap = new Map();
    }
    
    public get(key: number) {
        if (!this.nodeMap.has(key)) {
            return -1;
        } 
        this.update(key, this.nodeMap.get(key));
        
        return this.nodeMap.get(key).val;
    }

    private update(key: number, currNode: ListNode) {
        // remove in O(1) since we already know the location of the node
        this.list.remove(currNode);
        // add to front
        this.list.push(currNode);
        // update the hashmap
        this.nodeMap.set(key, currNode);
    }
    
    public put(key: number, value: number) {
        let node: ListNode = new ListNode(key, value);
        
        if (this.nodeMap.has(key)) {
            // find the node location in the map
            let currNode: ListNode = this.nodeMap.get(key);
            this.list.remove(currNode);
        } else if (this.nodeMap.size >= this.capacity) {
            // this node is not inside the map
            let tailNode: ListNode = this.list.removeBack();
            this.nodeMap.delete(tailNode.key);
        }
        
        this.list.push(node);
        this.nodeMap.set(key, node); 
    }
}

// TEST:
let cache: MyCache = new LRUCache(2);

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));       // returns 1
cache.put(3, 3);                 // evicts key 2
console.log(cache.get(2));       // returns -1 (not found)
cache.put(4, 4);                 // evicts key 1
console.log(cache.get(1));       // returns -1 (not found)
console.log(cache.get(3));       // returns 3
console.log(cache.get(4));       // returns 4