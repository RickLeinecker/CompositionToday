import TopNavBar from '../TopNavBar';
import GenericSearch from '../../Helper/Generics/GenericSearch';
import { Typography } from '@mui/material';

export default function RelatedProjects() {

    return (
        <>
            <TopNavBar />
            <div>
                <div>
                    Related Projects
                </div>
                <GenericSearch />
                <Typography >Featured Composers</Typography>
            </div>
        </>
    )
}
