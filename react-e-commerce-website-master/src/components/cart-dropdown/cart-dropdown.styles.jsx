import styled from 'styled-components'
import CustomButton from '../custom-button/custom-button.component'

export const CartDropDownContainer = styled.div`
    position: absolute;
    width: 240px;
    height: 350px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 3px;
    background-color: #91e8f0;
    top: 90px;
    right: 40px;
    z-index: 1;
    box-shadow: 0px 7px 16px 7px rgba(13, 85, 118, 0.5);
`

export const CartItemsContainer = styled.div`
        width: 100%;
        height: 243px;
        color: #63abb0;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-weight:lighter;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        `


export const EmptyCartMessage = styled.span`
        font-size: 20px;
        margin: 50px auto;
`

export const StyledCustomButton = styled(CustomButton)`
margin-top: auto;
`