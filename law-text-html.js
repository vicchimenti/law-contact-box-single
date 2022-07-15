/***
 *  @author Troy Fleischauer, BS Informatics, HCI '12
 *  @file   law/text/html
 *  @see    Content Type: Law - Contact Box (Single)
 *              ID: 5529
 * 
 *  An adaptation of 'Law - Contact Box' with a single stackable contact box and additional 'Phone 2' and 'Fax' fields.
 *  Document will write once when the page loads
 * 
 *  @version 210518.19
 * 
 */








/***
 *      Import T4 Utilities
 */
importClass(com.terminalfour.media.IMediaManager);
importClass(com.terminalfour.spring.ApplicationContextProvider);
importClass(com.terminalfour.publish.utils.BrokerUtils);
importClass(com.terminalfour.media.utils.ImageInfo);




/***
 *      Extract values from T4 element tags
 *      and confirm valid existing content item field
 */
function getContentValues(tag) {

    try {

        let _tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag).trim();

        return {
            isError: false,
            content: _tag == '' ? null : _tag
        };

    } catch (error) {

        return {
            isError: true,
            message: error.message
        };
    }
}




/***
 *      Returns a media object
 */
function getMediaInfo(mediaID) {

    let mediaManager = ApplicationContextProvider.getBean(IMediaManager);
    let media = mediaManager.get(mediaID, language);

    return media;
}




/***
 *      Returns a media stream object
 */
function readMedia(mediaID) {

    let mediaObj = getMediaInfo(mediaID);
    let oMediaStream = mediaObj.getMedia();

    return oMediaStream;
}




/***
 *      Write the document
 */
function writeDocument(array) {

    for (let i = 0; i < array.length; i++) {

        document.write(array[i]);
    }
}








/***
 *      Main
 */
try {


    /***
     *      Dictionary of content
     * */
    let contentDict = {

        itemName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
        heading: getContentValues('<t4 type="content" name="Optional Heading" output="normal" modifiers="striptags,htmlentities" />'),
        fullName: getContentValues('<t4 type="content" name="Full Name" output="normal" modifiers="striptags,htmlentities" />'),
        firstName: getContentValues('<t4 type="content" name="First Name" output="normal" modifiers="striptags,htmlentities" />'),
        lastName: getContentValues('<t4 type="content" name="Last Name" output="normal" modifiers="striptags,htmlentities" />'),
        title: getContentValues('<t4 type="content" name="Title" output="normal" modifiers="striptags,htmlentities" />'),
        subtitle: getContentValues('<t4 type="content" name="Subtitle" output="normal" modifiers="striptags,htmlentities" />'),
        phone1: getContentValues('<t4 type="content" name="Phone 1" output="normal" modifiers="striptags,htmlentities" />'),
        phone2: getContentValues('<t4 type="content" name="Phone 2" output="normal" modifiers="striptags,htmlentities" />'),
        fax: getContentValues('<t4 type="content" name="Fax" output="normal" modifiers="striptags,htmlentities" />'),
        email: getContentValues('<t4 type="content" name="Email" output="normal" modifiers="striptags,htmlentities,encode_emails" />'),
        office: getContentValues('<t4 type="content" name="Office" output="normal" modifiers="striptags,htmlentities" />'),
        additionalContent: getContentValues('<t4 type="content" name="Additional Text" output="normal" modifiers="medialibrary,nav_sections" />'),
        color: getContentValues('<t4 type="content" name="Background Color" output="normal" display_field="value" />'),
        articleImage: getContentValues('<t4 type="content" name="Photo" output="normal" formatter="path/*" />'),
        profileLinkUrl: getContentValues('<t4 type="content" name="Profile Link" output="linkurl" modifiers="nav_sections" />'),
        profileLinkText: getContentValues('<t4 type="content" name="Profile Link" output="linktext" modifiers="nav_sections" />'),
        anchorTag: getContentValues('<t4 type="meta" meta="html_anchor" />'),
        contentID: getContentValues('<t4 type="meta" meta="content_id" />')
    };




    /***
     *  default html initializations
     * 
     * */
    let htmlClose = '</div>';
    let openContactBoxSingle = '<div class="standardContent contactBoxSingle d-lg-flex">';
    let closeContactBoxSingle = '</div>';
    let openPhotoWrapper = '<div class="contactBoxSinglePhotoWrapper col-12 col-lg-4 me-lg-4">';
    let closePhotoWrapper = '</div>';
    let contactBoxSinglePhoto = '<div class="contactBoxSinglePhoto visually-hidden">No Image Provided</div>';
    let openSingleInfoWrapper = '<div class="contactBoxSingleInfoWrapper col-12 col-lg-8">';
    let closeSingleInfoWrapper = '</div>';
    let openSingleInfo = '<div class="contactBoxSingleInfo text-center text-lg-start">';
    let closeSingleInfo = '</div>';
    let clearFix = '<div class="clearfix"></div>';




    /***
     *  Parse for Background Color
     * 
     * */
    let htmlOpen = (contentDict.color.content) ?
        '<div class="contactBoxSingleWrapper contentItem contactBoxSingleColor' + contentDict.color.content + '" id="id' + contentDict.contentID.content + '" data-position-default="Main" data-position-selected="Main">' :
        '<div class="contactBoxSingleWrapper contentItem contactBoxSingleColorwhite" id="id' + contentDict.contentID.content + '" data-position-default="Main" data-position-selected="Main">';




    /***
     *  Parse for Bio Link
     * 
     * */
    let profileString = (contentDict.profileLinkUrl.content) ?
        '<p class="contactBoxSingleInfoProfile"><span class="fas fa-user"></span>&nbsp;<a href="' + contentDict.profileLinkUrl.content + '" aria-label="' + contentDict.profileLinkText.content + '" target="_blank">' + contentDict.profileLinkText.content + '</a></p>' :
        '<p class="contactBoxSingleInfoProfile visually-hidden">No Email Provided</p>';




    /***
     *  Parse for optional heading
     * 
     * */
    let headingString = (contentDict.heading.content) ?
        '<h2 class="contactBoxSingleTitle">' + contentDict.heading.content + '</h2>' :
        '<span class="contactBoxSingleTitle displayNone visually-hidden">No heading provided</span>';




    /***
     *  Parse for Full Name
     * 
     * */
    let fullNameString = (contentDict.fullName.content) ?
        '<h3 class="fullName">' + contentDict.fullName.content + '</h3>' :
        '<span class="displayNone visually-hidden">No heading provided</span>';




    /***
     *  Parse for Title
     * 
     * */
    let titleString = (contentDict.title.content) ?
        '<p class="contactBoxSingleInfoTitle">' + contentDict.title.content + '</p>' :
        '<p class="contactBoxSingleInfoTitle visually-hidden">No Title Provided</span>';




    /***
     *  Parse for Subtitle
     * 
     * */
    let subtitleString = (contentDict.subtitle.content) ?
        '<p class="contactBoxSingleInfoPosition">' + contentDict.subtitle.content + '</p>' :
        '<p class="contactBoxSingleInfoPosition visually-hidden">No Title Provided</span>';




    /***
     *  Parse for Phone 1
     * 
     * */
    let phone1String = (contentDict.phone1.content && contentDict.firstName.content) ?
        '<p class="contactBoxSingleInfoPhone" id="phone1' + contentDict.contentID.content + '"><span class="fas fa-phone"></span> <a class="contactPhone" href="tel:' + contentDict.phone1.content + '" aria-label="Call ' + contentDict.firstName.content + '">' + contentDict.phone1.content + '</a></p>' :
        (contentDict.phone1.content && contentDict.fullName.content) ?
        '<p class="contactBoxSingleInfoPhone" id="phone1' + contentDict.contentID.content + '"><span class="fas fa-phone"></span> <a class="contactPhone" href="tel:' + contentDict.phone1.content + '" aria-label="Call ' + contentDict.fullName.content + '">' + contentDict.phone1.content + '</a></p>' :
        '<p class="contactBoxSingleInfoPhone visually-hidden">No Phone 1 Provided</p>';




    /***
     *  Parse for Phone 2
     * 
     * */
    let phone2String = (contentDict.phone2.content) ?
        '<p class="contactBoxSingleInfoPhone" id="phone2' + contentDict.contentID.content + '"><span class="fas fa-phone"></span><span>&nbsp;' + contentDict.phone2.content + '</span></p>' :
        '<p class="contactBoxSingleInfoPhone visually-hidden">No Phone 2 Provided</p>';




    /***
     *  Parse for Fax
     * 
     * */
    let faxString = (contentDict.fax.content) ?
        '<p class="contactBoxSingleInfoPhone" id="fax' + contentDict.contentID.content + '"><span class="fas fa-fax"></span><span>&nbsp;' + contentDict.fax.content + '</span></p>' :
        '<p class="contactBoxSingleInfoPhone visually-hidden">No Fax Provided</p>';




    /***
     *  Parse for Office
     * 
     * */
    let officeString = (contentDict.office.content) ?
        '<p class="contactBoxSingleInfoOffice"><span class="fas fa-map-marker-alt"></span><span>&nbsp;' + contentDict.office.content + '</span></p>' :
        '<p class="contactBoxSingleInfoOffice visually-hidden">No Office Provided</p>';




    /***
     *  Parse for Email
     * 
     * */
    let emailString = (contentDict.email.content && contentDict.firstName.content) ?
        '<p class="contactBoxSingleInfoEmail"><span class="fas fa-envelope"></span>&nbsp;<a href="mailto:' + contentDict.email.content + '" aria-label="Send an email to ' + contentDict.firstName.content + '">Email ' + contentDict.firstName.content + '</a></p>' :
        (contentDict.email.content && contentDict.fullName.content) ?
        '<p class="contactBoxSingleInfoEmail"><span class="fas fa-envelope"></span>&nbsp;<a href="mailto:' + contentDict.email.content + '" aria-label="Send an email to ' + contentDict.fullName.content + '">Email ' + contentDict.fullName.content + '</a></p>' :
        '<p class="contactBoxSingleInfoEmail visually-hidden">No Email Provided</p>';




    /***
     *  Parse for Additional Content
     * 
     * */
    let additionalContentString = (contentDict.additionalContent.content) ?
        '<div class="contactBoxSingleInfoAdditional text-sm-start">' + contentDict.additionalContent.content + '</div>' :
        '<div class="contactBoxSingleInfoAdditional text-sm-start visually-hidden"><span class="visually-hidden">No Additional Content Provided</span></div>';




    /***
     *  Parse for Image Info
     * 
     * */
    if (contentDict.articleImage.content) {

        let imageID = content.get('Photo').getID();
        let mediaInfo = getMediaInfo(imageID);
        let media = readMedia(imageID);
        let info = new ImageInfo;
        info.setInput(media);

        let defaultImageAlt = contentDict.fullName.content ? contentDict.fullName.content : contentDict.itemName.content;
        let imageString = (info.check()) ?
            '<img src="' + contentDict.articleImage.content + '" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" />' :
            '<img src="' + contentDict.articleImage.content + '" alt="' + defaultImageAlt + '" loading="auto" />';

        contactBoxSinglePhoto = '<div class="contactBoxSinglePhoto">' + imageString + '</div>';
    }




    /***
     *  write document once
     * 
     * */
    writeDocument(
        [
            htmlOpen,
            contentDict.anchorTag.content,
            headingString,
            openContactBoxSingle,
            openPhotoWrapper,
            contactBoxSinglePhoto,
            closePhotoWrapper,
            openSingleInfoWrapper,
            openSingleInfo,
            fullNameString,
            titleString,
            subtitleString,
            phone1String,
            phone2String,
            faxString,
            officeString,
            emailString,
            profileString,
            additionalContentString,
            closeSingleInfo,
            closeSingleInfoWrapper,
            clearFix,
            closeContactBoxSingle,
            htmlClose
        ]
    );




} catch (err) {
    document.write(err.message);
}