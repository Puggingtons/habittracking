import React, { ReactNode } from "react";

//import style properties for grid view
import './grid_view_style.css';

//interface for grid view component props
interface GridViewComponentProps {
    gridViewId?: string,
    style?: React.CSSProperties,
    children?: ReactNode
}

//export default grid view component
const GridView : React.FC<GridViewComponentProps> = (props: GridViewComponentProps) => {
    return (
        <div id={props.gridViewId} className="grid-view-component-style" style={props.style}>{props.children}</div>
    )
}

//export as default
export default GridView;