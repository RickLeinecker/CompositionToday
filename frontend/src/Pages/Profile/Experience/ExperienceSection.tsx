import React, { useEffect, useState, useRef } from 'react'
import { Alert } from 'react-bootstrap';
import GenericHandler from '../../../Handlers/GenericHandler';
import { ExperienceType, GenericHandlerType } from '../../../ObjectInterface';
import ExperienceCard from './ExperienceCard';
import DefaultValues from '../../../Styles/DefaultValues.module.scss';
import CreateExperienceModal from './CreateExperienceModal';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';

type Props = {
    userID: number;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function ExperienceSection({ userID, createOpen, handleCloseCreate }: Props) {
    const [response, setResponse] = useState<Array<ExperienceType> | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [hasChanged, setHasChanged] = useState(false);
    const cache = useRef(new CellMeasurerCache({ fixedWidth: true }));

    const notifyChange = () => { setHasChanged(value => !value); }

    useEffect(() => {
        async function fetchData() {
            const handlerObject: GenericHandlerType = {
                data: JSON.stringify({ contentType: "experience", userID }),
                methodType: "POST",
                path: "getUserContentByType",
            }

            try {
                let answer = (await GenericHandler(handlerObject));
                if (answer.error.length > 0) {
                    setError(answer.error);
                    return;
                }

                setError("");
                setResponse(await answer.result.reverse());
                setLoading(false);


            } catch (e: any) {
                console.error("Frontend Error: " + e);
                setError(DefaultValues.apiErrorMessage);
            }

        }
        fetchData();
        // This helps resize new/removed data for window
        cache.current.clearAll();
    }, [userID, hasChanged])

    interface virtualizedType {
        key: any;
        index: number;
        style: any;
        parent: any;
    }

    return (
        <>
            <CreateExperienceModal userID={userID} notifyChange={notifyChange} createOpen={createOpen} handleCloseCreate={handleCloseCreate} />
            {
                !error && loading ? <div>...loading</div>
                    :
                    error ? <Alert variant="danger">{error}</Alert>
                        :
                        <div style={{ width: "100%", height: "50vh" }}>
                            <AutoSizer>
                                {({ width, height }) => (
                                    <List
                                        style={{ scrollbarWidth: "none" }}
                                        width={width}
                                        height={height}
                                        rowHeight={cache.current.rowHeight}
                                        deferredMeasurementCache={cache.current}
                                        rowCount={!response ? 0 : response.length}
                                        rowRenderer={({ key, index, style, parent }: virtualizedType) => {
                                            const result = response?.[index]!;

                                            return (
                                                <CellMeasurer
                                                    key={key}
                                                    cache={cache.current}
                                                    parent={parent}
                                                    columnIndex={0}
                                                    rowIndex={index}
                                                >
                                                    <div style={{ ...style, padding: "1% 1% 20px" }}>
                                                        <ExperienceCard
                                                            experience={result}
                                                            isMyProfile={true}
                                                            notifyChange={notifyChange}
                                                        />
                                                    </div>
                                                </CellMeasurer>
                                            )
                                        }}
                                    />
                                )}
                            </AutoSizer>
                        </div>
            }
        </>
    )
}