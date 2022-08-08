import { DefaultCheckoutButton } from '@bigcommerce/checkout-js/default-checkout-button-integration';

import { CheckoutButtonProps, CheckoutButtonResolveId, EmbeddedCheckoutUnsupportedError, toResolvableComponent } from '@bigcommerce/checkout-js/payment-integration';

import React, { FunctionComponent } from 'react';

const GooglePayButton: FunctionComponent<CheckoutButtonProps> = props => {
    const { isEmbedded, language, onUnhandledError } = props;

    if (isEmbedded) {
        onUnhandledError(new EmbeddedCheckoutUnsupportedError(
            language.translate('embedded_checkout.unsupported_error', {
                methods: 'googlepay',
            })
        ));

        return null;
    }

    return (
        <DefaultCheckoutButton { ...props } />
    );
}

export default toResolvableComponent<CheckoutButtonProps, CheckoutButtonResolveId>(
    GooglePayButton,
    [{ id: 'googlepay' }]
);
