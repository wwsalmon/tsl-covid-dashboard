import {CaseItem} from "../utils/types";
import getBgClass, {getBorderClass, getTextClass} from "../utils/getBgClass";

const CaseDot = (props: {case: CaseItem}) => (
    <div className={`w-10 h-10 mb-5 mr-5 rounded-full flex items-center justify-center ${props.case.isNoReport ? `opacity-50 border-2 border-dashed ${getBorderClass(props.case.school)}` : getBgClass(props.case.school)}`}>
        {props.case.isEmployee && (
            <span className="text-white opacity-75 font-bold">E</span>
        )}
        {props.case.isNoReport && (
            <span className={`font-bold ${getTextClass(props.case.school)}`}>N</span>
        )}
    </div>
);

export default CaseDot;