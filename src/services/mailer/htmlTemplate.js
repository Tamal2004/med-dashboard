const { REACT_APP_DOMAIN } = process.env;

export default (
    content,
    testerId = null
) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>A Simple Responsive HTML Email</title>
    <style type="text/css">
        body {margin: 0; padding: 0; min-width: 100%!important;}
        img {height: auto;}
        .content {width: 100%; max-width: 600px;}
        .header {padding: 40px 30px 20px 30px;}
        .innerpadding {padding: 30px 30px 30px 30px;}
        .borderbottom {border-bottom: 1px solid #f2eeed;}
        .subhead {font-size: 15px; color: #ffffff; font-family: sans-serif; letter-spacing: 10px;}
        .h1, .h2, .bodycopy {color: #153643; font-family: sans-serif;}
        .h1 {font-size: 33px; line-height: 38px; font-weight: bold;}
        .h2 {padding: 0 0 15px 0; font-size: 24px; line-height: 28px; font-weight: bold;}
        .bodycopy {font-size: 16px; line-height: 22px;}
        .button {text-align: center; font-size: 18px; font-family: sans-serif; font-weight: bold; padding: 0 30px 0 30px;}
        .button a {color: #ffffff; text-decoration: none;}
        .footer {padding: 20px 30px 15px 30px;}
        .footercopy {font-family: sans-serif; font-size: 14px; color: #ffffff;}
        .footercopy a {color: #ffffff; text-decoration: underline;}
        .delink a {
            color: white;
            text-decoration: none;
        }

        @media only screen and (max-width: 550px), screen and (max-device-width: 550px) {
            body[yahoo] .hide {display: none!important;}
            body[yahoo] .buttonwrapper {background-color: transparent!important;}
            body[yahoo] .button {padding: 0px!important;}
            body[yahoo] .button a {background-color: #e05443; padding: 15px 15px 13px!important;}
            body[yahoo] .unsubscribe {display: block; margin-top: 20px; padding: 10px 50px; background: #2f3942; border-radius: 5px; text-decoration: none!important; font-weight: bold;}
        }
        
        @media only screen and (min-device-width: 601px) {
          .content {width: 600px !important;}
          .col425 {width: 425px!important;}
          .col380 {width: 380px!important;}
          }

    </style>
</head>

<body yahoo bgcolor="#f6f8f1">
<table width="100%" bgcolor="#f6f8f1" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td>
            <!--[if (gte mso 9)|(IE)]>
            <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td>
            <![endif]-->
            <table bgcolor="#ffffff" class="content" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td bgcolor="#ffebcd" class="header">
                        <table width="270" align="left" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td height="30" style="padding: 0 20px 20px 0;">
                                    <img class="fix" src="https://wupdb-production.s3-eu-west-1.amazonaws.com/static/media/logo.png" width="270" height="70" border="0" alt="" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="innerpadding borderbottom">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            ${content}
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="footer" bgcolor="#44525f">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        
                            ${
                                testerId
                                    ? `<tr>
                                <td align="center" class="footercopy">
                                    <span class="hide">If you no longer wish to be considered for website usability testing sessions, please </span>
                                    <a href="${REACT_APP_DOMAIN}/unsubscribe?id=${testerId}" class="unsubscribe"><font color="#ffffff">click here</font></a>
                                    <span class="hide"> to be removed from our tester database.</span>
                                </td>
                            </tr>`
                                    : ''
                            }
                            <tr>
                                <td align="left" style="padding: 20px 0 0 0;">
                                    <table border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td width="37" style="text-align: center; padding: 0 10px 0 14px; display: flex; align-items: center;">
                                                <a href="tel:01249-444-757">
                                                    <img src="https://icon-library.net/images/phone-icon-transparent/phone-icon-transparent-13.jpg" width="28" height="28" alt="Facebook" border="0" />
                                                </a>
                                                <span style="color: white; white-space: nowrap; padding: 4px 4px 4px 9px;">01249-444-757</span>
                                            </td>
                                            <td width="37" style="text-align: center; padding: 0 10px 0 10px; display: flex; align-items: center;">
                                                <a href="mailto:avril@webusability.co.uk">
                                                    <img src="https://png.pngtree.com/svg/20160617/mail_122991.png" width="37" height="37" alt="Twitter" border="0" />
                                                </a>
                                                <span class="delink" style="color: white; white-space: nowrap; padding: 4px; line-height: 1.6rem; text-decoration: none;">avril@webusability.co.uk</span>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
</table>
</body>
</html>

`;
