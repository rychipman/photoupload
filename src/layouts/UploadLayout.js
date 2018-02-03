import React from 'react'
import {
    Button,
    Grid,
    Icon,
    Popup,
    Segment,
} from 'semantic-ui-react'

const UploadButton = ({ onFileAdd }) => {
    const button = (
        <Button
            color='teal'
            size='small'
            as='label'
        >
            Upload
            <input
                onChange={e => Array.from(e.target.files).map(f => onFileAdd(f))}
                id='photoinput'
                name='photoinput'
                accept='image/*'
                type='file'
                multiple
                style={{display: 'none'}}
            />
        </Button>
    )
    return (
        <Popup
            trigger={button}
            content='select files to upload'
            position='bottom center'
            size='tiny'
        />
    )
}

const FilterSelector = ({ filters, floated }) => {
    const buildButton = (filter) => (
        <Button
            content={filter.name}
            active={filter.active}
        />
    )
    const buildPopupText = (filter) => {
        const action = filter.active ? 'hide' : 'show'
        return 'click to ' + action + ' ' + filter.subject
    }
    return (
        <Button.Group size='tiny' floated={floated}>
        {filters.map(f => (
            <Popup
                content={buildPopupText(f)}
                trigger={buildButton(f)}
                position='bottom center'
                size='mini'
            />
        ))}
        </Button.Group>
    )
}

const UploaderHeader = ({ onFileAdd }) => {
    const filters = [
        {name: 'In Progress', subject: 'ongoing uploads', active: true},
        {name: 'Succeeded', subject: 'successful uploads', active: false},
        {name: 'Failed', subject: 'failed uploads', active: false},
    ]
    return (
        <Segment clearing textAlign='left'>
            <UploadButton onFileAdd={onFileAdd}/>
            <FilterSelector filters={filters} floated='right'/>
        </Segment>
    )
}

const FileList = ({ files, onFileAdd }) => {
    const button = <Button floated='right' icon='trash' size='tiny'/>
    const fileList = files.map(file => (
        <Segment key={file.id} textAlign='left' clearing>
            <Icon name='image' circular color='teal'/>
            <span style={{marginLeft: '13px'}}>
                {file.filename}
            </span>
            <Popup
                trigger={button}
                content='delete this file'
                size='tiny'
                position='left center'
            />
        </Segment>
    ))
    const defaultContent = (
        <Segment textAlign='center' secondary>
            No files to show. Select files for upload or modify filters.
        </Segment>
    )
    return (
        <Segment.Group>
            <UploaderHeader onFileAdd={onFileAdd}/>
            { fileList.length > 0
              ? fileList
              : defaultContent }
        </Segment.Group>
    )
}
const UploadLayout = ({ files, onFileAdd }) => {
    const containerStyle = {
        padding: '20px',
        height: '100%',
        width: '100%',
    }
    return (
        <div className='uploader' style={containerStyle}>
            <Grid textAlign='center' verticalAlign='top'>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <FileList files={files} onFileAdd={onFileAdd}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default UploadLayout
