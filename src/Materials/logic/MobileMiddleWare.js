export const isMobile = window.screen.width < 770;

export const disableMinimumScreenSize = () =>{
    window.$(".browser_").css("min-width", "0px");
}