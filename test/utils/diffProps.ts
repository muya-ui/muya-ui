const propsMap: any = {};

export default function diffProps(props: any, key: number | string) {
  const prevProps = propsMap[key];
  if (prevProps) {
    Object.keys(props).forEach(key => {
      if (props[key] !== prevProps[key]) {
        console.log(`${key} is not same`);
      }
    });
  }
  propsMap[key] = props;
}
