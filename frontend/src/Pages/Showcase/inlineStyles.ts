import DefaultValues from '../../Styles/DefaultValues.module.scss';
import paperStyle from './PaperStyle.module.scss';

export const gridStyle = { marginBottom: '1.5rem' };
export const marqueeStyle: React.CSSProperties = { position: 'absolute', width: '95%' };
export const genreStyle = { backgroundColor: DefaultValues.secondaryColor + "4A", alignItems: "center", display: "flex", justifyContent: "center", verticalAlign: "middle" };
export const style = { position: 'relative', backgroundColor: DefaultValues.secondaryColor + "4A", height: paperStyle.paperSize, width: paperStyle.paperSize, borderRadius: '25px' };
export const style2 = { position: 'absolute', height: paperStyle.innerSize, width: paperStyle.innerSize, borderRadius: '10px' };
export const style3 = { backgroundColor: "#151515CC", height: '3rem', borderRadius: '10px' };
export const imgStyle: React.CSSProperties = { backgroundSize: paperStyle.paperSize, borderRadius: '25px', height: "100%", width: "100%", display: "flex", justifyContent: "center", alignContent: "center", flexDirection: "column" };