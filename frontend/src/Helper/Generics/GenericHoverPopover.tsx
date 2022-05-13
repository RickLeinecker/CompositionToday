import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

type Props = {
    children: React.ReactElement;
    tooltipText: String;
}

export default function GenericHoverPopover({children, tooltipText}: Props) {

    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
          {tooltipText}
        </Tooltip>
      );
      
    return (
        <div>
            <OverlayTrigger
                placement="right"
                delay={{ show: 500, hide: 0 }}
                overlay={renderTooltip}
            >
                {children}
            </OverlayTrigger>
        </div>

    )
}
