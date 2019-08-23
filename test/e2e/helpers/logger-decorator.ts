export default function log(target, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = (async function (...args: any[]) {
        const result = await originalMethod.apply(this, args);
        await console.log('Call: ', `${propertyKey}(${args.map((a: any) => JSON.stringify(a)).join()}) => ${JSON.stringify(Promise.resolve(result))}`);
        return await result;
    });

    return descriptor;
}
