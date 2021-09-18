import {CaseItem} from "../utils/types";
import getBgClass from "../utils/getBgClass";

const CaseDot = (props: {case: CaseItem}) => (
    <div className={`w-10 h-10 mb-5 mr-5 rounded-full flex items-center justify-center ${getBgClass(props.case.school)}`}>
        {props.case.isEmployee && (
            <span className="text-white opacity-75 font-bold">E</span>
        )}
    </div>
);

export default CaseDot;