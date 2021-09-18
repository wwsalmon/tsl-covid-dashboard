export default function H1(props: React.HTMLProps<HTMLHeadingElement>) {
    let newProps = {...props};
    delete newProps.className;

    return (
        <h1
            className={"font-serif text-3xl font-bold " + props.className}
            {...newProps}
        >
            {props.children}
        </h1>
    );
}