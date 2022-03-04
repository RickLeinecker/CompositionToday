import { Divider } from '@mui/material'
import React from 'react'
import { Button } from 'react-bootstrap'
import RelatedProjectsCard from '../../RelatedProjects/RelatedProjectsCard'

type Props = {
    url: string;
    imageFilepath: string;
    projectTitle: string;
    description: string;
    backgroundColor: string;
    updateViewPreview: () => void;
}

export default function AdminRelatedProjectModalPreview({url, imageFilepath, projectTitle, description, backgroundColor, updateViewPreview}: Props) {
    return (
        <div>
            <h3>
                Preview Project
            </h3>
            <Divider sx={{ marginBottom: "10px" }} />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <RelatedProjectsCard relatedProject={{
                    id: 0,
                    url: url,
                    imageFilepath: imageFilepath,
                    imageFilename: "",
                    projectTitle: projectTitle,
                    description: description,
                    backgroundColor: backgroundColor,
                }}
                />
            </div>
            <Button onClick={updateViewPreview}>
                Back
            </Button>
        </div>
    )
}
