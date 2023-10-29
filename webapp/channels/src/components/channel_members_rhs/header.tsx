// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import { FormattedMessage, useIntl, injectIntl } from 'react-intl'; // Import useIntl and injectIntl
import styled from 'styled-components';

import type { Channel } from '@mattermost/types/channels';

import OverlayTrigger from 'components/overlay_trigger';
import Tooltip from 'components/tooltip';

import Constants from 'utils/constants';

// Remove import of LocalizedIcon

interface Props {
    channel: Channel;
    canGoBack: boolean;

    onClose: () => void;
    goBack: () => void;
}

const BackButton = styled.button`
    border: 0;
    background: transparent;
`;

const HeaderTitle = styled.span`
    line-height: 2.4rem;
`;

const Header = ({ channel, canGoBack, onClose, goBack }: Props) => {
    const intl = useIntl(); // Use useIntl hook for localization

    const closeSidebarTooltip = (
        <Tooltip id='closeSidebarTooltip'>
            <FormattedMessage
                id='rhs_header.closeSidebarTooltip'
                defaultMessage='Close'
            />
        </Tooltip>
    );

    return (
        <div className='sidebar--right__header'>
            <span className='sidebar--right__title'>
                {canGoBack && (
                    <BackButton
                        className='sidebar--right__back'
                        onClick={goBack}
                    >
                        {channel.display_name && (
                            <span
                                className='icon icon-arrow-back-ios'
                                aria-label={intl.formatMessage({ // Use formatMessage for localization
                                    id: 'backIconAriaLabel',
                                    defaultMessage: 'Back Icon',
                                })}
                            />
                        )}
                    </BackButton>
                )}
                <HeaderTitle>
                    <FormattedMessage
                        id='channel_members_rhs.header.title'
                        defaultMessage='Members'
                    />
                </HeaderTitle>
                {channel.display_name && (
                    <span className='style--none sidebar--right__title__subtitle'>
                        {channel.display_name}
                    </span>
                )}
            </span>
            <OverlayTrigger
                delayShow={Constants.OVERLAY_TIME_DELAY}
                placement='top'
                overlay={closeSidebarTooltip}
            >
                <button
                    id='rhsCloseButton'
                    type='button'
                    className='sidebar--right__close btn btn-icon btn-sm'
                    aria-label={intl.formatMessage({ // Use formatMessage for localization
                        id: 'closeIconAriaLabel',
                        defaultMessage: 'Close Sidebar Icon',
                    })}
                    onClick={onClose}
                >
                    <span
                        className='icon icon-close'
                    />
                </button>
            </OverlayTrigger>
        </div>
    );
};

export default Header;
