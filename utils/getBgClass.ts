import {schoolOpts} from "./types";

const getBgClass = (school: schoolOpts) => ({
    pomona: "bg-pomona",
    hmc: "bg-hmc",
    cmc: "bg-cmc",
    pitzer: "bg-pitzer",
    scripps: "bg-scripps",
    all: "bg-tsl",
}[school]);

export default getBgClass;

export const getBorderClass = (school: schoolOpts) => ({
    pomona: "border-pomona",
    hmc: "border-hmc",
    cmc: "border-cmc",
    pitzer: "border-pitzer",
    scripps: "border-scripps",
    all: "border-tsl",
}[school]);

export const getTextClass = (school: schoolOpts) => ({
    pomona: "text-pomona",
    hmc: "text-hmc",
    cmc: "text-cmc",
    pitzer: "text-pitzer",
    scripps: "text-scripps",
    all: "text-tsl",
}[school]);