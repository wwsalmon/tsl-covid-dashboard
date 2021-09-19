import {CaseItem} from "../utils/types";
import getBgClass, {getBorderClass, getTextClass} from "../utils/getBgClass";
import Link from "next/link";

const CaseDot = (props: {case: CaseItem}) => (
    <Link href={`/${props.case.school}`}>
        <a
            className={`
            w-10 h-10 mb-5 mr-5 rounded-full flex items-center justify-center
            ${(props.case.isNoReport || props.case.isNoCases)
                ? `opacity-50 border-2 ${props.case.isNoReport ? "border-dashed" : ""} ${getBorderClass(props.case.school)}`
                : getBgClass(props.case.school)
            }
        `}
        >
            {props.case.isEmployee && (
                <span className="text-white opacity-75 font-bold">E</span>
            )}
            {(props.case.isNoReport || props.case.isNoCases) && (
                <span className={`font-bold ${getTextClass(props.case.school)}`}>{props.case.isNoReport ? "N" : 0}</span>
            )}
        </a>
    </Link>
);

export default CaseDot;