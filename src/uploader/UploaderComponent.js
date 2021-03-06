import React from 'react'
import {
    Button,
    Grid,
    Icon,
    Loader,
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
            onClick={filter.onClick}
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
                key={f.name}
                content={buildPopupText(f)}
                trigger={buildButton(f)}
                position='bottom center'
                size='mini'
            />
        ))}
        </Button.Group>
    )
}

const UploaderHeader = (props) => {
    const filters = [
        {
            name: 'In Progress (' + props.numInProgress + ')',
            subject: 'ongoing uploads',
            active: props.showInProgress,
            onClick: props.inProgressListToggle,
        },
        {
            name: 'Uploaded (' + props.numSucceeded + ')',
            subject: 'successful uploads',
            active: props.showUploaded,
            onClick: props.uploadedListToggle,
        },
        {
            name: 'Failed (' + props.numFailed + ')',
            subject: 'failed uploads',
            active: props.showFailed,
            onClick: props.failedListToggle,
        },
    ]
    return (
        <Segment clearing textAlign='left'>
            <UploadButton onFileAdd={props.onFileAdd}/>
            <FilterSelector filters={filters} floated='right'/>
        </Segment>
    )
}

const File = ({ file, onRetry }) => {
    const loadingIcon = <Loader active inline size='small'/>
    const retryButton = (
        <Button
            onClick={onRetry}
            floated='right'
            icon='repeat'
            size='tiny'
        />
    )

    let primary = null
    let secondary = null

    if (file.failed) {
        primary = <Icon name='remove' color='red' size='large'/>
        secondary = (
            <Popup
                trigger={retryButton}
                content='retry upload'
                size='tiny'
                position='left center'
            />
        )
    } else if (file.uploading) {
        primary = loadingIcon
    } else if (file.uploaded) {
        primary = <Icon name='checkmark' color='teal' size='large'/>
        secondary = (
            <a href={file.uri}>
                <Button floated='right' icon='external' size='tiny' />
            </a>
        )
    }

    return (
        <Segment key={file.id} textAlign='left' clearing>
            {primary}
            <span style={{marginLeft: '13px'}}>
                {file.filename}
            </span>
            {secondary}
        </Segment>
    )
}

const FileList = (props) => {

    let fileList = props.files.filter(f => {
        if (f.failed) {
            return props.showFailed
        } else if (f.uploaded) {
            return props.showUploaded
        } else if (f.uploading) {
            return props.showInProgress
        }
        return true
    })

    const defaultContent = (
        <Segment textAlign='center' secondary>
            No files to show. Select files for upload or modify filters.
        </Segment>
    )

    const fileRows = fileList.map(f => (
        <File
            key={f.id}
            file={f}
            onRetry={() => props.onFileRetry(f)}
        />
    ))

    const headerProps = {
        ...props,
        numSucceeded: props.files.filter(f => f.uploaded).length,
        numFailed: props.files.filter(f => f.failed).length,
        numInProgress: props.files.filter(f => f.uploading).length,
    }

    return (
        <Segment.Group>
            <UploaderHeader {...headerProps}/>
            { fileRows.length > 0
              ? fileRows
              : defaultContent }
        </Segment.Group>
    )
}
const UploaderComponent = (props) => {
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
                        <FileList {...props}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default UploaderComponent
