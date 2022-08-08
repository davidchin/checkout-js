import React, { Fragment, FunctionComponent } from 'react';

import { withCheckout, WithCheckoutProps } from '../checkout';
import { isEmbedded } from '../embeddedCheckout';
import { TranslatedString, withLanguage, WithLanguageProps } from '../locale';
import resolveCheckoutButton from './resolveCheckoutButton';

export interface CheckoutButtonListProps {
    onUnhandledError(error: Error): void;
}

const CheckoutButtonList: FunctionComponent<
    CheckoutButtonListProps &
    WithCheckoutProps &
    WithLanguageProps
> = ({
    checkoutService,
    checkoutState,
    language,
    onUnhandledError
}) => {
    const { 
        statuses: { isInitializingCustomer },
        data: { getConfig },
    } = checkoutState;

    const methodIds = getConfig()?.checkoutSettings?.remoteCheckoutProviders ?? [];

    return (
        <Fragment>
            { !isInitializingCustomer() && <p><TranslatedString id="remote.continue_with_text" /></p> }

            <div className="checkoutRemote">
                { methodIds.map(methodId => {
                    const ResolvedCheckoutButton = resolveCheckoutButton({ id: methodId });

                    if (!ResolvedCheckoutButton) {
                        return null;
                    }

                    return <ResolvedCheckoutButton
                        checkoutService={ checkoutService }
                        checkoutState={ checkoutState }
                        containerId={ `${methodId}CheckoutButton` }
                        key={ methodId }
                        language={ language }
                        isEmbedded={ isEmbedded() }
                        methodId={ methodId }
                        onUnhandledError={ onUnhandledError }
                    />
                }) }
            </div>
        </Fragment>
    );
};

export default withCheckout(props => props)(
    withLanguage(CheckoutButtonList)
);
