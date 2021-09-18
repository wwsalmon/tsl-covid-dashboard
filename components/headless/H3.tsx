export default function H3(props: React.HTMLProps<HTMLHeadingElement>) {
    let newProps = {...props};
    delete newProps.className;

    return (
        <h3
            className={"font-serif font-bold text-lg " + props.className}
            {...newProps}
        >
            {props.children}
        </h3>
    );
}