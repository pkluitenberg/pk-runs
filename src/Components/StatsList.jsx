import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, List, ListItem} from "@material-ui/core";

function StatsList(props) {
    const items = props.listItems.map((item,index) => {
        return <ListItem key={index}>
            <Card style={{width: '100%'}}>
                <CardHeader
                    avatar={
                        item.avatar
                    }
                    title={item.title}
                    subheader={item.subheader}
                />
            </Card>
        </ListItem>
    })
    return (
        <List>
            <ListItem>
                <Card style={{width: '100%'}}>
                    <CardHeader
                        title={props.listTitle}
                    />
                </Card>
            </ListItem>
            {items}
        </List>
    )
}

StatsList.defaultProps =
    {}
;

StatsList.propTypes = {
    listTitle: PropTypes.string,
    listItems: PropTypes.arrayOf(PropTypes.shape(
        {
            avatar: PropTypes.object,
            title: PropTypes.string,
            subheader: PropTypes.string
        })
    )
};

export default StatsList;