import $ from "jquery";

export const preventScroll = () => {
    $('html, body').css({
        overflow: 'hidden',
        height: '100%'
    });
};

export const allowScroll = () =>{
    $('html, body').css({
        overflow: 'auto',
        height: 'auto'
    });
}