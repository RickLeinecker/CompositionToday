import DefaultValues from '../../Styles/DefaultValues.module.scss';
import paperStyle from './PaperStyle.module.scss';

const genreStyle = { backgroundColor: DefaultValues.secondaryColor + "4A", alignItems: "center", display: "flex", justifyContent: "center", verticalAlign: "middle" };
const style = { backgroundColor: DefaultValues.secondaryColor + "4A", height: paperStyle.paperSize, width: paperStyle.paperSize, borderRadius: '25px' };
const style2 = { height: paperStyle.innerSize, width: paperStyle.innerSize, borderRadius: '10px' };
const style3 = { backgroundColor: "#151515CC", height: '3rem', borderRadius: '10px' };

export {genreStyle, style, style2, style3};