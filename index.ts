// let noDupes = new Set([1, 1, 3, 4, 2]);

// noDupes;

class ArrayNoCloned<T> extends Array<T> {
  constructor(data: T[]) {
    super(...data);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ArrayNoCloned.prototype);
  }

  override push(...items: T[]): number {
    let numberOfItems = super.push(...items);

    // old arr
    let oldItems = [...super.values()];

    // filtering
    let filtered: Set<T> = new Set<T>(oldItems);

    // remove old items
    oldItems.forEach(() => super.pop());

    // add new items
    filtered.forEach((item) => super.push(item));

    return numberOfItems;
  }
}

const noClone = new ArrayNoCloned([1, 2, 3]);
noClone.push(50);
noClone.push(1);
noClone.push(1);
noClone.push(1);
noClone.push(1);
// noClone.forEach((e) => console.log(e));

console.log(noClone);
