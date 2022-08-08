import { DefaultCheckoutButton } from '@bigcommerce/checkout-js/default-checkout-button-integration';
import { CheckoutButtonProps } from '@bigcommerce/checkout-js/payment-integration';
import { createCheckoutService, createLanguageService } from '@bigcommerce/checkout-sdk';
import { mount } from 'enzyme';
import React from 'react';

import GooglePayButton from './GooglePayButton';

describe('GooglePayButton', () => {
    let defaultProps: CheckoutButtonProps;

    beforeEach(() => {
        const checkoutService = createCheckoutService();

        defaultProps = {
            checkoutService,
            checkoutState: checkoutService.getState(),
            containerId: 'button-container',
            isEmbedded: false,
            language: createLanguageService(),
            methodId: 'googlepay',
            onUnhandledError: jest.fn(),
        };
    });

    it('delegates to default checkout button if checkout is not embedded', () => {
        const component = mount(<GooglePayButton { ...defaultProps } />);

        expect(component.find(DefaultCheckoutButton).length)
            .toEqual(1);
    });

    it('calls error callback if checkout is embedded', () => {
        mount(<GooglePayButton { ...defaultProps } isEmbedded={ true } />);

        expect(defaultProps.onUnhandledError)
            .toHaveBeenCalled();
    });
});
