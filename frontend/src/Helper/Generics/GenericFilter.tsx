import TuneIcon from '@mui/icons-material/Tune';
import { Collapse } from 'react-bootstrap';
import { IconButton } from '@mui/material';
import useToggle from '../CustomHooks/useToggle';

const GenericFilter = () => {
    const {value, toggleValue} = useToggle(false);

    return (
        <>
            <IconButton onClick={toggleValue}>
                <TuneIcon fontSize="large" />
            </IconButton>
            <Collapse in={value}>
                <div>
                    Filter stuff
                </div>
            </Collapse>
        </>
    );
}

export default GenericFilter;