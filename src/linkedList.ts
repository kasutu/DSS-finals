export abstract class List<T> {
  public abstract add(item: T): void;
  public abstract unshift(item: T): void;
  public abstract get(index: number): T | undefined;
  public abstract getNode(index: number): LinkedListNode<T> | undefined;
  public abstract get length(): number;
}

class LinkedListNode<T> {
  constructor(public data: T, public next?: LinkedListNode<T>) {}
}

class LinkedList<T> extends List<T> {
  head?: LinkedListNode<T>;
  tail?: LinkedListNode<T>;
  private count = 0;

  public unshift(item: T): void {
    // unshift implementation
    let temp = new LinkedListNode<T>(item);
    let last = this.getNode(this.count);

    console.log('HEAD: ', this.head);
    console.log('LAST: ', last);

    if (!this.head) {
      this.head = temp;
      this.tail = this.head;
      this.tail.next = this.head; // circularly implementation
    } else {
      // all the data
      let oldHead = this.head;
      // console.log('OLD HEAD NEXT: ', oldHead);

      this.head = new LinkedListNode<T>(item);
      this.head.next = oldHead;
      // console.log('NEW HEAD: ', this.head);
    }

    // for (let i = 0; i < list.length; i++) {
    //   console.log(list.get(i));
    // }

    this.count++;
  }

  public add(item: T): void {
    let temp = new LinkedListNode<T>(item);
    let last = this.getNode(this.length);

    console.log('HEAD: ', this.head);
    console.log('LAST: ', last);

    if (!this.head) {
      this.head = temp;
      this.tail = this.head;
      this.tail.next = this.head; // circularly implementation
      // console.log('tail next: ', this.tail.next);
      // console.log('head: ', this.head);
    } else {
      this.tail!.next = temp;
      this.tail = this.tail!.next;
      // console.log('tail next: ', this.tail.next);
      // console.log('head: ', this.head);
    }

    this.count++;
  }

  public get(index: number): T | undefined {
    let current = this.head;
    let hops = 0;

    while (current !== null && hops !== index) {
      current = current?.next;
      hops++;
    }

    return current?.data;
  }

  public getNode(index: number): LinkedListNode<T> | undefined {
    let current = this.head;
    let hops = 0;

    while (current !== null && hops !== index) {
      current = current?.next;
      hops++;
    }

    return current;
  }

  public get length() {
    return this.count;
  }
}

function test() {
  let list: List<string> = new LinkedList();

  list.add('iron man');

  list.add('tail1');
  list.add('tail2');
  list.add('tail3');
  list.add('endgame');

  list.unshift('unshifting here boi');
  list.unshift('heheh');
  list.unshift('lodii');
  list.unshift('bwahahahhahaha');
  list.unshift('ez');

  for (let i = 0; i < list.length; i++) {
    console.log(list.get(i));
  }
}

test();
