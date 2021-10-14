/***
 *  @author Troy Fleischauer, BS Informatics, HCI '12
 *  @file   law/text/html
 *  @see    Content Type: Law - Contact Box (Single)
 *              ID: 5529
 * 
 *  An adaptation of 'Law - Contact Box' with a single stackable contact box and additional 'Phone 2' and 'Fax' fields.
 *  Document will write once when the page loads
 * 
 *  @version 210518.2
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
         var _tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag)
         return {
             isError: false,
             content: _tag == '' ? null : _tag
         }
     } catch (error) {
         return {
             isError: true,
             message: error.message
         }
     }
 }
 
 
 
 
 /***
  *      Returns a media object
  */
 function getMediaInfo(mediaID) {
 
     var mediaManager = ApplicationContextProvider.getBean(IMediaManager);
     var media = mediaManager.get(mediaID, language);
 
     return media;
 }
 
 
 
 
 /***
  *      Returns a media stream object
  */
 function readMedia(mediaID) {
 
     var mediaObj = getMediaInfo(mediaID);
     var oMediaStream = mediaObj.getMedia();
 
     return oMediaStream;
 }
 
 
 
 
 /***
  *      Returns an array of list items
  */
  function assignList(arrayOfValues) {
 
     let listValues = '';
 
     for (let i = 0; i < arrayOfValues.length; i++) {
 
         listValues += '<li class="tag">' + arrayOfValues[i].trim() + '</li>';
     }
 
     return listValues;
 }
 
 
 
 
 /***
  *      Write the document
  */
 function writeDocument(array) {
 
     for (let i = 0; i < array.length; i++) {
 
         document.write(array[i]);
     }
 }




try {



    /***
     *      Dictionary of content
     * */
    var contentDict = {

        heading: getContentValues('<t4 type="content" name="Optional Heading" output="normal" modifiers="striptags,htmlentities" />'),
        fullName: getContentValues('<t4 type="content" name="Full Name" output="normal" modifiers="striptags,htmlentities" />'),
        title: getContentValues('<t4 type="content" name="Title" output="normal" modifiers="striptags,htmlentities" />'),
        phone1: getContentValues('<t4 type="content" name="Phone 1" output="normal" modifiers="striptags,htmlentities" />'),
        phone2: getContentValues('<t4 type="content" name="Phone 2" output="normal" modifiers="striptags,htmlentities" />'),
        fax: getContentValues('<t4 type="content" name="Fax" output="normal" modifiers="striptags,htmlentities" />'),
        email: getContentValues('<t4 type="content" name="Email" output="normal" modifiers="striptags,htmlentities,encode_emails" />'),
        office: getContentValues('<t4 type="content" name="Office" output="normal" modifiers="striptags,htmlentities" />'),
        additionalContent: getContentValues('<t4 type="content" name="Additional Text" output="normal" modifiers="medialibrary,nav_sections" />'),
        color: getContentValues('<t4 type="content" name="Background Color" output="normal" display_field="value" />'),
        articleImage: getContentValues('<t4 type="content" name="Photo" output="normal" formatter="path/*" />'),
        anchorTag: getContentValues('<t4 type="meta" meta="html_anchor" />'),
        contentID: getContentValues('<t4 type="meta" meta="content_id" />')
    };



    
    /***
     *  default html initializations
     * 
     * */
    var htmlOpen = '<div class="contactBoxSingleWrapper contentItem contactBoxSingleColor" id="id' + contentDict.contentID.content + '" data-position-default="Main" data-position-selected="Main">';
    var htmlClose = '</div>';
    var openContactBoxSingle = '<div class="standardContent contactBoxSingle d-lg-flex">';
    var closeContactBoxSingle = '</div>';
    var openPhotoWrapper = '<div class="contactBoxSinglePhotoWrapper col-12 col-lg-4 me-lg-4">';
    var closePhotoWrapper = '</div>';
    var contactBoxSinglePhoto ='<div class="contactBoxSinglePhoto visually-hidden">No Image Provided</div>';
    var openSingleInfoWrapper = '<div class="contactBoxSingleInfoWrapper col-12 col-lg-8">';
    var closeSingleInfoWrapper = '</div>';
    var openSingleInfo = '<div class="contactBoxSingleInfo text-center text-lg-start">';
    var closeSingleInfo = '</div>';
    var clearFix = '<div class="clearfix"></div>';




    /***
     *  Parse for optional heading
     * 
     * */
    var headingString =             (contentDict.heading.content)
                                    ? '<h2 class="contactBoxSingleTitle">' + contentDict.heading.content + '</h2>'
                                    : '<span class="contactBoxSingleTitle displayNone visually-hidden">No heading provided</span>';



    
    /***
     *  Parse for Full Name
     * 
     * */
    var fullNameString =            (contentDict.fullName.content)
                                    ? '<h3 class="fullName">' + contentDict.fullName.content + '</h3>'
                                    : '<span class="displayNone visually-hidden">No heading provided</span>';


    /***
     *  Parse for Title
     * 
     * */
    var titleString =               (contentDict.title.content)
                                    ? '<p class="contactBoxSingleInfoPosition">' + contentDict.title.content + '</p>'
                                    : '<p class="contactBoxSingleInfoPosition visually-hidden">No Title Provided</span>';




    /***
     *  Parse for Phone 1
     * 
     * */
    var phone1String =              (contentDict.phone1.content)
                                    ? '<p class="contactBoxSingleInfoPhone" id="phone1' + contentDict.contentID.content + '"><span class="fas fa-phone"></span><span>&nbsp;' + contentDict.phone1.content + '</span></p>'
                                    : '<p class="contactBoxSingleInfoPhone visually-hidden">No Phone 1 Provided</p>';




    /***
     *  Parse for Phone 2
     * 
     * */
    var phone2String =              (contentDict.phone2.content)
                                    ? '<p class="contactBoxSingleInfoPhone" id="phone2' + contentDict.contentID.content + '"><span class="fas fa-phone"></span><span>&nbsp;' + contentDict.phone2.content + '</span></p>'
                                    : '<p class="contactBoxSingleInfoPhone visually-hidden">No Phone 2 Provided</p>';




    /***
     *  Parse for Fax
     * 
     * */
    var faxString =                 (contentDict.fax.content)
                                    ? '<p class="contactBoxSingleInfoPhone" id="fax' + contentDict.contentID.content + '"><span class="fas fa-fax"></span><span>&nbsp;' + contentDict.fax.content + '</span></p>'
                                    : '<p class="contactBoxSingleInfoPhone visually-hidden">No Fax Provided</p>';




    /***
     *  Parse for Office
     * 
     * */
    var officeString =              (contentDict.office.content)
                                    ? '<p class="contactBoxSingleInfoOffice"><span class="fas fa-map-marker-alt"></span><span>&nbsp;' + contentDict.office.content + '</span></p>'
                                    : '<p class="contactBoxSingleInfoOffice visually-hidden">No Office Provided</p>';




    /***
     *  Parse for Email
     * 
     * */
    var emailTitle =                (contentDict.fullName.content ?? "SU Law")
    var emailString =               (contentDict.email.content)
                                    ? '<p class="contactBoxSingleInfoEmail"><span class="fas fa-envelope"></span>&nbsp;<a href="mailto:' + contentDict.email.content + '" aria-label="Send an email to ' + emailTitle + '">Contact ' + emailTitle + '</a></p>'
                                    : '<p class="contactBoxSingleInfoEmail visually-hidden">No Email Provided</p>';




    /***
     *  Parse for Additional Content
     * 
     * */
    var additionalContentString =   (contentDict.additionalContent.content)
                                    ? '<div class="contactBoxSingleInfoAdditional text-sm-start">' + contentDict.additionalContent.content + '</div>'
                                    : '<div class="contactBoxSingleInfoAdditional text-sm-start visually-hidden"><span class="visually-hidden">No Additional Content Provided</span></div>';




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
                phone1String,
                phone2String,
                faxString,
                officeString,
                emailString,
                additionalContentString,
                closeSingleInfo,
                closeSingleInfoWrapper,
                clearFix,
                closeContactBoxSingle,
                htmlClose
            ]
        );






    
    // Write the HTML with embedded user values into the page
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, htmlOpen));
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, anchorTag));
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openContactBoxSingle));
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openPhotoWrapper));
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, contactBoxSinglePhoto));
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closePhotoWrapper));
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openSingleInfoWrapper));
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, openSingleInfo));
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, fullNameString));
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, htmlBox));
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeSingleInfo));
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeSingleInfoWrapper));
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, clearFix));
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, closeContactBoxSingle));
    // document.write(com.terminalfour.publish.utils.BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, htmlClose));
    
    }
    catch (exception) {
        document.write (exception); // Catch any errors that the above code may throw 
    }