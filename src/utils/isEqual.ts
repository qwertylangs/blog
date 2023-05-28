const isEqual = (a: object | Array<any>, b: object | Array<any>) => {
  const props1 = Object.getOwnPropertyNames(a);
  const props2 = Object.getOwnPropertyNames(b);

  if (props1.length !== props2.length) {
    return false;
  }

  for (let i = 0; i < props1.length; i++) {
    const prop: string = props1[i];

    const objectAProp = prop as keyof typeof a;
    const objectBProp = prop as keyof typeof b;

    const areBothObjects =
      typeof a[objectAProp] === "object" &&
      a[objectAProp] !== null &&
      typeof b[objectBProp] === "object" &&
      b[objectBProp] !== null;

    if (
      (!areBothObjects && a[objectAProp] !== b[objectBProp]) ||
      (areBothObjects && !isEqual(a[objectAProp], b[objectBProp]))
    ) {
      return false;
    }
  }
  return true;
};
export default isEqual;
