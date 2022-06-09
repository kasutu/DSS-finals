export abstract class List<T> {
  public abstract makeCircular(): LinkedListNode<T> | undefined;
  public abstract unshift(item: T): void;
  public abstract add(item: T): void;
  public abstract get(index: number): T | undefined;
  public abstract get length(): number;
  public abstract get headNode(): LinkedListNode<T> | undefined;
}

class LinkedListNode<T> {
  constructor(public data: T, public next?: LinkedListNode<T>) {}
}

class LinkedList<T> extends List<T> {
  head?: LinkedListNode<T>;
  tail?: LinkedListNode<T>;
  private count = 0;

  public makeCircular(): LinkedListNode<T> | undefined {
    /**
     * @steps
     *
     *1) make a headCopy
     *2) find the last node then
     *3) lastNode.next = headCopy
     */

    // init a current (important) node is the head
    let current = this.head;

    // traverse and find the last node
    while (current?.next !== undefined) {
      current = current?.next;
    }

    // set the last node's next if it is undefined
    current!.next = this.head;
    return this.head;
  }

  public unshift(item: T): void {
    // unshift implementation
    let temp = new LinkedListNode<T>(item);

    // all the data
    let oldHead = this.head;

    temp.next = oldHead;
    this.head = temp;

    this.count++;
  }

  public add(item: T): void {
    let temp = new LinkedListNode<T>(item);

    if (!this.head) {
      this.head = temp;
      this.tail = this.head;
    } else {
      this.tail!.next = temp;
      this.tail = this.tail!.next;
    }

    this.count++;
  }

  public get(index: number): T | undefined {
    let current = this.head;
    let hops = 0;

    while (current !== undefined && hops !== index) {
      current = current?.next;
      hops++;
    }

    console.log('HOPS: ', hops, 'LAST NODE: ', current?.data);

    return current?.data;
  }

  public get length() {
    return this.count;
  }

  public get headNode() {
    return this.head;
  }
}

function test() {
  let list: List<string> = new LinkedList();

  list.add('1st item');
  list.add('2nd item');
  list.add('3rd item');
  // list.add('4th item');
  // list.add('5th item add() ending');

  // list.unshift('6th unshifting here boi');
  // list.unshift('7th unshift');
  // list.unshift('8th unshift');
  // list.unshift('9th unshift');
  // list.unshift('10th unshift');

  for (let i = 0; i < list.length; i++) {
    list.get(i);
  }

  console.log(list.makeCircular());
}

test();
