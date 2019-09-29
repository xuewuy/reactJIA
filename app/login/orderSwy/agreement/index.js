import React from 'react'
import './agreement.less'
import constant from 'constant'

export default class AgreementComponent extends React.Component {

    findElem(arrayToSearch, attr, val) {
        for (var i = 0; i < arrayToSearch.length; i++) {
            if (arrayToSearch[i][attr] == val) {
                return i;
            }
        }
        return -1;
    }

    render() {
        let url = document.location.hostname,
            company = constant.COMPANY,
            index = company.findIndex(i=>i.appDomain.indexOf(','+url+',')!=-1),//this.findElem(company, "appDomain", url),
            section = true ?
                (<section className='agreement'>
                    <h1>“账无忌”软件服务协议</h1>
                    <h5>欢迎您使用“账无忌”软件！</h5>

                    <p>为使用 “账无忌”软件及服务，您应当阅读并遵守《“账无忌”软件服务协议》（以下简称为本协议）中的各条款。</p>

                    <p>请您务必审慎阅读、充分理解各条款内容，特别是限制或免除责任的条款，以及开通或使用某项服务时的单独协议或规则。</p>

                    <p>本协议是用户与北京易稅客科技有限公司之间关于使用“账无忌”软件及相关服务所订立的协议。除非您已阅读并接受本协议所有条款，否则您无权使用本软件及服务。您的注册、登录、使用本服务的任何行为，均视为您已阅读并同意接受本协议各项条款的约束。</p>

                    <p>本协议内容同时包括北京易稅客科技有限公司可能不断发布的关于“账无忌”的相关规范、规则、指引等补充或修改内容。上述内容一经正式发布，即成为本协议的补充内容，从发布之日，具有本协议同等的法律约束力，您同样应当遵守。</p>
                    <h5>一、相关术语</h5>

                    <p>1．1 “账无忌”软件和服务</p>

                    <p>是指在网页中的“账无忌”软件，其服务内容包含客户管理、初始化、税款通知、批量申报、流水账（管理）、财务核算、税务申报等账无忌平台上的所有服务内容，该软件能帮助代账公司更好的管理客户，提升工作效率，能协助企业快速了解与改善企业财务。软件的功能和服务以网页上发布的具体信息为准。</p>
                    <p>1．2 “账无忌”用户</p>

                    <p>是指使用“账无忌”软件和服务的代账公司中的个人、法人或其他组织，在本协议中以下简称为“您”。</p>

                    <p>1．3 “账无忌”提供者</p>

                    <p>是指北京易稅客科技有限公司。“账无忌”软件的所有权、服务运营权及业务规则和活动的修改权均归该公司所有。</p>
                    <h5>二、知识产权声明</h5>

                    <p>2．1 北京易稅客科技有限公司是“账无忌”软件相关知识产权的权利人。“账无忌”软件的著作权、商标权、专利权、商业秘密等知识产权，以及与本服务相关的所有信息内容（包括但不限于文字、图片、音频、视频、图表、界面设计、版面框架、有关数据或电子文档等）均受中华人民共和国法律法规和相应国际条约保护。非经北京易稅客科技有限公司或其他权利人书面同意任何人不得使用、冒名、发表、修改、复制、发行、出租、公开传播、翻译“账无忌”软件的内容；非经北京易稅客科技有限公司或其他权利人书面同意任何人不得使用、许诺销售、销售“账无忌”软件的产品和使用“账无忌”标识与“账无忌”产品标识近似的标识：</p>

                    <p>2．2 您仅拥有依照本协议约定，合法使用本软件服务的权利。</p>
                    <h5>三、注册资料与隐私</h5>

                    <p>3．1 注册资料</p>

                    <p>您应当保证注册时提交的用户信息的正确性与完整性。当资料发生变化时，您应当及时通过网页上发布的联系方式进行更改。如您提供的用户信息不准确、不完整或您未及时更改用户信息而引起的一切后果由您本人承担。</p>

                    <p>3．2 数据归属权</p>

                    <p>您在“账无忌”创建的独创性数据归属您所有，您有权进行任何形式的处置，包括从软件中复制、导出和删除。</p>

                    <p>3．3 用户隐私权</p>

                    <p>（1）“账无忌”将从组织结构和技术角度尽最大努力保护您的数据安全，并只根据您在软件中的指示来分发您的信息。除非经司法或行政机关的要求，北京易稅客科技有限公司不会将您的数据提供任何无关的第三方。</p>

                    <p>（2）“账无忌”保留使用汇总统计信息的权利，这些信息应是匿名，且不针对特定用户。</p>

                    <p>（3）“账无忌”保留面向免费模式用户刊载广告的权利。在广告刊载过程中将可能使用必要的定向技术提高广告相关度，但北京易稅客科技有限公司仅在匿名的基础上通过自动化匹配技术实现广告优化刊载，而不会将您的信息透露给广告商。</p>

                    <p>（4）您如果需要全面删除“账无忌”上用户数据，需要专门书面向“账无忌”提出申请。“账无忌”有权先行核实您申请的真实性。</p>

                    <p>（5）北京易稅客科技有限公司在提供本软件服务过程中，您同意北京易稅客科技有限公司通过电子邮件、手机短信、网页公告等其他方式向您发送相关信息。</p>
                    <h5>四、使用规则</h5>

                    <p>4．1 您在申请使用“账无忌”时，必须向北京易稅客科技有限公司提供企业资料，如企业资料有任何变动，必须及时更新。</p>

                    <p>4．2 在您遵守本协议条款的前提下，北京易稅客科技有限公司将授予您对本软件的非专有使用权，同一时间内您可以且仅可以在一台终端设备上使用本软件。在您成为本软件的用户后，您可以通过您注册的用户名、密码与“账无忌”的服务器链接，接受相关的服务。</p>

                    <p>4．3 您应当妥善保管自己的用户名、密码，北京易稅客科技有限公司无核查用户名真实性与合法性的义务，任何以您用户名所做出的行为将被视为您的行为，您需要对此承担全部法律责任。</p>

                    <p>4．4 本服务中可能会使用第三方软件或技术，若有使用，“账无忌”保证已经获得合法授权。</p>

                    <p>4．5 您购买本服务后，只可供自己使用，不得直接或间接地以转让、出售、出租、合作等任何形式，有偿或无偿地将部分或全部的服务提供给第三方使用。</p>

                    <p>4．6 您应自行对因使用本服务而存储在“账无忌”服务器的各类数据等信息，采取合理、安全的技术措施，确保其安全性，并对自己的行为（包括但不限于采取加密措施或其他安全措施等）所引起的结果承担全部责任。</p>

                    <p>
                        4．7 您在使用本软件的过程中，必须遵守以下原则：
                        <p>（1）遵守中国有关的法律和法规；</p>

                        <p>（2）不得为任何非法目的而使用本软件；</p>

                        <p>（3）遵守所有与本软件有关的协议、规定和程序；</p>

                        <p>（4）不得利用本软件进行任何可能对互联网的正常运转造成不利影响的行为；</p>

                        <p>（5）不得利用本软件进行任何侵害北京易稅客科技有限公司合法权利的行为；</p>
                    </p>
                    <p>
                        4．8 “账无忌”仅限于给您提供用作正常和合法的财务工具服务，您如果违反了上述原则或使用“账无忌”从事以下行为，将导致根本性违约，北京易稅客科技有限公司有权随时停止服务、解除本合约，并追讨您因此带来的损失：
                        <p>（1）有明确证据表明您使用“账无忌”用于违反法律的业务。</p>

                        <p>（2）侵犯北京易稅客科技有限公司的知识产权。</p>

                        <p>（3）为设计开发竞争产品，利用“账无忌“现有技术，对“账无忌”进行任何形式的反向工程，或在竞争产品抄袭模仿“账无忌”的设计。</p>

                        <p>（4）滥用“账无忌”的通信功能发送垃圾邮件和短信。</p>

                        <p>（5）对“账无忌”的连续服务和商誉构成损害的其他行为。</p>
                    </p>
                    <h5>五、使用方式</h5>

                    <p>5．1 “账无忌”一部分功能为免费使用，另一部分功能采用预先付费的模式，即先付费后才能使用，具体以网页上公布的情况为准。</p>

                    <p>5．2 您可选择按时间直接付费购买服务。北京易稅客科技有限公司在收到您网上支付的费用后，立即开通相应的功能。</p>

                    <p>5．3 北京易稅客科技有限公司有调整本软件收费标准、办法的权利，您购买收费功能的价格及实际支付的费用，以您购买时北京易稅客科技有限公司公布的相关规定为准。</p>

                    <p>5．4 您付费后，未经北京易稅客科技有限公司同意，您不得以任何理由要求北京易稅客科技有限公司退还部分或全部已交款项。</p>

                    <p>5．5 您购买的服务时间到期之日的24点，收费部分的功能将停止，您只能使用其他免费的功能。</p>
                    <h5>六、服务</h5>

                    <p>6．1 北京易稅客科技有限公司将根据您的选择提供相应服务，具体服务内容以网页上发布的信息为准，北京易稅客科技有限公司保留随时变更、中断或终止“账无忌”软件部分或全部服务的权利。</p>

                    <p>6．2 北京易稅客科技有限公司将向您提供“账无忌”软件的维护和支持，许可您使用该软件的升级版。</p>

                    <p>6．3 北京易稅客科技有限公司提供给您的“账无忌”软件的升级版是该软件的一部分，将受本协议的制约。</p>

                    <p>6．4 使用该软件时，与信息终端有关的设备及所需的费用（如上网费）均由您自行承担。</p>

                    <p>6．5 北京易稅客科技有限公司若自行或根据相关部门的信息、权利人的投诉等，发现您违反相关法律法规或本协议，北京易稅客科技有限公司有权根据自己的独立判断并随时单方采取以下措施中的一种或多种：
                        <p>（1）删除、屏蔽相关内容或断开链接等；</p>

                        <p>（2）要求您立即更换、修改内容；</p>

                        <p>（3）限制、中止您使用本服务；</p>

                        <p>（4）终止您使用本服务，解除协议关系，不退还已交费用；</p>

                        <p>（5）追究您的法律责任；</p>

                        <p>（6）其他北京易稅客科技有限公司认为适合的处理措施。</p>
                    </p>
                    <p>6．6 您因违反本协议约定所引起的纠纷、责任由您负责，北京易稅客科技有限公司有权解除本协议，无需向您退还任何费用，而由此给您带来的损失（包括但不限于通信中断、相关数据清空、未使用的服务费用作为违约金而归北京易稅客科技有限公司所有），由您自行承担，造成北京易稅客科技有限公司或他人损失的，您应一并予以赔偿。</p>

                    <p>6．7 未经您同意，北京易稅客科技有限公司不会向“账无忌”以外的任何公司、组织和个人披露、提供您的信息，但下列情形除外：
                        <p>（1）依据本协议或其他相关协议、规则等规定可以提供的；</p>

                        <p>（2）依据法律法规的规定可以提供的；</p>

                        <p>（3）行政、司法等政府部门要求提供的；</p>

                        <p>（4）您同意“账无忌”服务向第三方提供；</p>

                        <p>（5）为解决举报事件、提起诉讼而需要提供的；</p>

                        <p>（6）为防止严重违法行为或涉嫌犯罪行为发生而采取必要、合理行动所必须提供的。</p>
                    </p>
                    <h5>七、免责声明</h5>

                    <p>7．1 您应充分认识互联网软件的风险，您同意使用“账无忌”所存在的风险完全由您承担。</p>

                    <p>7．2 鉴于网络服务的特殊性，您同意北京易稅客科技有限公司在有正当理由的情况下可以变更、中断或终止部分或全部的服务，而无需向您承担责任。北京易稅客科技有限公司会竭尽所能提前通知您，以便您做好相关数据的转移备份以及业务调整等，保护您的合法权益。</p>

                    <p>7．3 尽管北京易稅客科技有限公司对您的信息保护做了极大努力，但仍不能在现有安全技术措施下完全保证您信息的绝对安全。您的信息可能会因为不可抗力或非“账无忌”的因素而造成泄漏、被窃取等，由此给您造成损失时，您同意北京易稅客科技有限公司可以免责。</p>

                    <p>7．4 北京易稅客科技有限公司将尽最大努力保障您数据的安全备份，对收费模式用户，北京易稅客科技有限公司承诺在服务器存储设备损坏时，将以最快速度从最近的备份中恢复数据，但数据恢复可能无法做到100%。对因数据丢失带来的其他连带或间接损失，北京易稅客科技有限公司不承担任何责任。</p>

                    <p>7．5 北京易稅客科技有限公司不担保该软件一定能满足您的要求，对软件系统的及时性、安全性、准确性也都不作担保。</p>

                    <p>
                        7．6 北京易稅客科技有限公司对以下情形导致的服务中断或受阻不承担赔偿责任：
                        <p>（1）由于政府禁令、政府管制、现行生效的适用法律或法规的变更、火灾、地震、动乱、战争、停电、通讯线路中断、他人蓄意破坏、黑客攻击、计算机病毒侵入或发作、电信部门技术调整之影响等不可预见、不可避免、不可克服和不可控制的事件，均属于不可抗力事件，由此造成您或任何第三人出现或蒙受任何损失或损害，北京易稅客科技有限公司不承担责任。但北京易稅客科技有限公司应可能降低或消除已经发生的损失或损害。</p>

                        <p>（2）您或北京易稅客科技有限公司的电脑软件、系统、硬件和通信线路 出现故障。</p>

                        <p>（3）您自身原因（包括但不限于电脑病毒、错误操作、网络连接错误等）。</p>

                        <p>（4）其他非北京易稅客科技有限公司过错或北京易稅客科技有限公司无法控制与合理预见的情形。</p>
                    </p>
                    <h5>八、服务变更、中断和中止</h5>

                    <p>8．1 如因系统维护或升级需要而需暂停“账无忌”服务，北京易稅客科技有限公司将尽可能事先进行通告。</p>

                    <p>8．2 如您违反本协议中规定的使用规则或约定，北京易稅客科技有限公司有权随时中断或终止向您提供本协议项下的服务而无需通知您。</p>

                    <p>8．3 您同意，北京易稅客科技有限公司有权将本协议全部或部分权利义务转让给第三方，但转让方有责任保证该等转让不会对您使用本软件或享受的本服务产生不利影响。</p>
                    <h5>九、关于通知</h5>

                    <p>9．1 北京易稅客科技有限公司可能会以网页公告、网页提示、电子邮箱、手机短信、常规信件传送、您注册的本服务账户的管理系统内发送站内信等方式中的一种或多种，向您送达关于本服务的各种规则、通知、提示等信息，这些信息一经公布或发送，即视为送达，对您产生约束力。</p>

                    <p>9．2 如果您未及时查看相关信息内容，或您提供的电子邮箱、手机号码、通讯地址等信息错误，导致您未收到相关规则、通知、提示等信息的，一切后果及责任由您自行承担。</p>

                    <p>9．3 您同意北京易稅客科技有限公司或其合作伙伴可以向您的电子邮件、手机号码等发送可能与本服务不相关的其他各类信息，包括但不限于商业广告等。</p>

                    <p>9．4 北京易稅客科技有限公司为您提供在线客户服务，帮助您解决使用过程所遇到的问题。若您有事项需要通知北京易稅客科技有限公司，应当通过网页中公布的对外沟通方式，通知和联系客服。</p>
                    <h5>十、违约责任</h5>

                    <p>10．1 您同意保障和维护北京易稅客科技有限公司及其他用户的利益，如因您违反法律法规或本协议项下的条款而给北京易稅客科技有限公司或任何其他第三人造成损失，您同意承担由此造成的损害赔偿责任。</p>

                    <p>10．2 如您违反本协议所述条款，则北京易稅客科技有限公司有权随时取消您使用“账无忌”的许可，且北京易稅客科技有限公司无须向您承担任何补偿或赔偿。</p>
                    <h5>十一、协议的修改和终止</h5>

                    <p>11．1 北京易稅客科技有限公司将有权随时修改本协议的有关条款，一旦本协议的内容发生变更，北京易稅客科技有限公司将通过本协议约定的通知条款以适当的方式向您提示修改内容。</p>

                    <p>11．2 如果您不同意北京易稅客科技有限公司对本协议相关条款的修改，您有权停止使用“账无忌”，但如果您已交纳了相关费用，将不退还。如您继续使用，则视为您接受北京易稅客科技有限公司对相应条款的修改。</p>
                    <h5>十二、其他</h5>

                    <p>12．1 维护密码及用户名的机密安全，是您的责任。利用该密码及用户名所进行的一切行为，您都应负完全的责任。所衍生的任何损失或损害，北京易稅客科技有限公司无法也不承担任何责任。您同意以下事项：
                        <p>（1）您的密码或用户名遭到未获授权的使用，或者其他任何安全问题发生时，您应立即通知北京易稅客科技有限公司客服。</p>

                        <p>（2）（2）每次连线使用完毕，均应结束您的用户名使用。若您未能依前述要求行事，则有可能得不到北京易稅客科技有限公司在信息安全方面的保护。</p>
                    </p>
                    <p>12．2 您使用本服务即视为您已阅读并同意受本协议的约束。北京易稅客科技有限公司有权在必要时修改本协议条款。您可以在相关页面中查阅最新的协议条款。本协议条款变更后，如果您继续使用本服务，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用本服务。</p>

                    <p>12．3 本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。</p>

                    <p>12．4 若您和北京易稅客科技有限公司之间发生任何纠纷或争议，首先应友好协商解决；协商不成功的，双方均同意将纠纷或争议提交北京易稅客科技有限公司注册地有管辖权的人民法院管辖。</p>

                    <p>12．5 北京易稅客科技有限公司对本协议保留解释的权利，本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</p>

                    <p>12．6 本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。</p>
                </section>)
                :
                (<section className='agreement'>
                    <h1>“{company[index].name}”软件服务协议</h1>
                    <h5>欢迎您使用“{company[index].name}”软件！</h5>

                    <p>为使用 “{company[index].name}”软件及服务，您应当阅读并遵守《“{company[index].name}”软件服务协议》（以下简称为本协议）中的各条款。</p>

                    <p>请您务必审慎阅读、充分理解各条款内容，特别是限制或免除责任的条款，以及开通或使用某项服务时的单独协议或规则。</p>

                    <p>
                        本协议是用户与{company[index].companyName}之间关于使用“{company[index].name}”软件及相关服务所订立的协议。除非您已阅读并接受本协议所有条款，否则您无权使用本软件及服务。您的注册、登录、使用本服务的任何行为，均视为您已阅读并同意接受本协议各项条款的约束。</p>

                    <p>
                        本协议内容同时包括{company[index].companyNameShort}可能不断发布的关于“{company[index].name}”的相关规范、规则、指引等补充或修改内容。上述内容一经正式发布，即成为本协议的补充内容，从发布之日，具有本协议同等的法律约束力，您同样应当遵守。</p>
                    <h5>一、相关术语</h5>

                    <p>1．1 “{company[index].name}”软件和服务</p>

                    <p>是指在网页中的“{company[index].name}”软件，其服务内容包含流水账（管理）、财务核算、税务申报等云端服务内容，该软件能协助企业快速了解与改善企业财务。软件的功能和服务以网页上发布的具体信息为准。</p>

                    <p>1．2 “{company[index].name}”用户</p>

                    <p>是指使用“{company[index].name}”软件和服务的个人、法人或其他组织，在本协议中以下简称为“您”。</p>

                    <p>1．3 “{company[index].name}”提供者</p>

                    <p>是指{company[index].companyName}（以下简称{company[index].companyNameShort}）。“{company[index].name}”软件的所有权、服务运营权及业务规则和活动的修改权均归该公司所有。</p>
                    <h5>二、知识产权声明</h5>

                    <p>2．1
                        {company[index].companyNameShort}是“{company[index].name}”软件相关知识产权的权利人。“{company[index].name}”软件的著作权、商标权、专利权、商业秘密等知识产权，以及与本服务相关的所有信息内容（包括但不限于文字、图片、音频、视频、图表、界面设计、版面框架、有关数据或电子文档等）均受中华人民共和国法律法规和相应国际条约保护。非经{company[index].companyNameShort}或其他权利人书面同意任何人不得使用、冒名、发表、修改、复制、发行、出租、公开传播、翻译“{company[index].name}”软件的内容；非经{company[index].companyNameShort}或其他权利人书面同意任何人不得使用、许诺销售、销售“{company[index].name}”软件的产品和使用“{company[index].name}”标识与“{company[index].name}”产品标识近似的标识：</p>

                    <p>2．2 您仅拥有依照本协议约定，合法使用本软件服务的权利。</p>
                    <h5>三、个人资料与隐私</h5>

                    <p>3．1 个人资料</p>

                    <p>
                        您应当保证注册时提交的用户信息的正确性与完整性。当资料发生变化时，您应当及时通过网页上发布的联系方式进行更改。如您提供的用户信息不准确、不完整或您未及时更改用户信息而引起的一切后果由您本人承担。</p>

                    <p>3．2 数据归属权</p>

                    <p>您在“{company[index].name}”创建的独创性数据归属您所有，您有权进行任何形式的处置，包括从软件中复制、导出和删除。</p>

                    <p>3．3 用户隐私权</p>

                    <p>（1）“{company[index].name}”将从组织结构和技术角度尽最大努力保护您的数据安全，并只根据您在软件中的指示来分发您的信息。除非经司法或行政机关的要求，{company[index].companyNameShort}不会将您的数据提供任何无关的第三方。</p>

                    <p>（2）“{company[index].name}”保留使用汇总统计信息的权利，这些信息应是匿名，且不针对特定用户。</p>

                    <p>
                        （3）“{company[index].name}”保留面向免费模式用户刊载广告的权利。在广告刊载过程中将可能使用必要的定向技术提高广告相关度，但{company[index].companyNameShort}仅在匿名的基础上通过自动化匹配技术实现广告优化刊载，而不会将您的信息透露给广告商。</p>

                    <p>（4）您如果需要全面删除“{company[index].name}”上用户数据，需要专门书面向“{company[index].name}”提出申请。“{company[index].name}”有权先行核实您申请的真实性。</p>

                    <p>（5）{company[index].companyNameShort}在提供本软件服务过程中，您同意{company[index].companyNameShort}通过电子邮件、手机短信、网页公告等其他方式向您发送相关信息。</p>
                    <h5>四、使用规则</h5>

                    <p>4．1 您在申请使用“{company[index].name}”时，必须向{company[index].companyNameShort}提供个人资料，如个人资料有任何变动，必须及时更新。</p>

                    <p>4．2
                        在您遵守本协议条款的前提下，{company[index].companyNameShort}将授予您对本软件的非专有使用权，同一时间内您可以且仅可以在一台终端设备上使用本软件。在您成为本软件的用户后，您可以通过您注册的用户名、密码与“{company[index].name}”的服务器链接，接受相关的服务。</p>

                    <p>4．3 您应当妥善保管自己的用户名、密码，{company[index].companyNameShort}无核查用户名真实性与合法性的义务，任何以您用户名所做出的行为将被视为您的行为，您需要对此承担全部法律责任。</p>

                    <p>4．4 本服务中可能会使用第三方软件或技术，若有使用，“{company[index].name}”保证已经获得合法授权。</p>

                    <p>4．5 您购买本服务后，只可供自己使用，不得直接或间接地以转让、出售、出租、合作等任何形式，有偿或无偿地将部分或全部的服务提供给第三方使用。</p>

                    <p>4．6
                        您应自行对因使用本服务而存储在“{company[index].name}”服务器的各类数据等信息，采取合理、安全的技术措施，确保其安全性，并对自己的行为（包括但不限于采取加密措施或其他安全措施等）所引起的结果承担全部责任。</p>

                    <p>
                        4．7 您在使用本软件的过程中，必须遵守以下原则：
                        <p>（1）遵守中国有关的法律和法规；</p>

                        <p>（2）不得为任何非法目的而使用本软件；</p>

                        <p>（3）遵守所有与本软件有关的协议、规定和程序；</p>

                        <p>（4）不得利用本软件进行任何可能对互联网的正常运转造成不利影响的行为；</p>

                        <p>（5）不得利用本软件进行任何侵害{company[index].companyNameShort}合法权利的行为；</p>
                    </p>
                    <p>
                        4．8
                        “{company[index].name}”仅限于给您提供用作正常和合法的财务工具服务，您如果违反了上述原则或使用“{company[index].name}”从事以下行为，将导致根本性违约，{company[index].companyNameShort}有权随时停止服务、解除本合约，并追讨您因此带来的损失：
                        <p>（1）有明确证据表明您使用“{company[index].name}”用于违反法律的业务。</p>

                        <p>（2）侵犯{company[index].companyNameShort}的知识产权。</p>

                        <p>（3）为设计开发竞争产品，利用“{company[index].name}“现有技术，对“{company[index].name}”进行任何形式的反向工程，或在竞争产品抄袭模仿“{company[index].name}”的设计。</p>

                        <p>（4）滥用“{company[index].name}”的通信功能发送垃圾邮件和短信。</p>

                        <p>（5）对“{company[index].name}”的连续服务和商誉构成损害的其他行为。</p>
                    </p>
                    <h5>五、使用方式</h5>

                    <p>5．1 “{company[index].name}”一部分功能为免费使用，另一部分功能采用预先付费的模式，即先付费后才能使用，具体以网页上公布的情况为准。</p>

                    <p>5．2 您可选择按时间直接付费购买服务。{company[index].companyNameShort}在收到您网上支付的费用后，立即开通相应的功能。</p>

                    <p>5．3 {company[index].companyNameShort}有调整本软件收费标准、办法的权利，您购买收费功能的价格及实际支付的费用，以您购买时{company[index].companyNameShort}公布的相关规定为准。</p>

                    <p>5．4 您付费后，未经{company[index].companyNameShort}同意，您不得以任何理由要求{company[index].companyNameShort}退还部分或全部已交款项。</p>

                    <p>5．5 您购买的服务时间到期之日的24点，收费部分的功能将停止，您只能使用其他免费的功能。</p>
                    <h5>六、服务</h5>

                    <p>6．1 {company[index].companyNameShort}将根据您的选择提供相应服务，具体服务内容以网页上发布的信息为准，{company[index].companyNameShort}保留随时变更、中断或终止“{company[index].name}”软件部分或全部服务的权利。</p>

                    <p>6．2 {company[index].companyNameShort}将向您提供“{company[index].name}”软件的维护和支持，许可您使用该软件的升级版。</p>

                    <p>6．3 {company[index].companyNameShort}提供给您的“{company[index].name}”软件的升级版是该软件的一部分，将受本协议的制约。</p>

                    <p>6．4 使用该软件时，与信息终端有关的设备及所需的费用（如上网费）均由您自行承担。</p>

                    <p>
                        6．5 {company[index].companyNameShort}若自行或根据相关部门的信息、权利人的投诉等，发现您违反相关法律法规或本协议，{company[index].companyNameShort}有权根据自己的独立判断并随时单方采取以下措施中的一种或多种：
                        <p>（1）删除、屏蔽相关内容或断开链接等；</p>

                        <p>（2）要求您立即更换、修改内容；</p>

                        <p>（3）限制、中止您使用本服务；</p>

                        <p>（4）终止您使用本服务，解除协议关系，不退还已交费用；</p>

                        <p>（5）追究您的法律责任；</p>

                        <p>（6）其他{company[index].companyNameShort}认为适合的处理措施。</p>
                    </p>
                    <p>6．6
                        您因违反本协议约定所引起的纠纷、责任由您负责，{company[index].companyNameShort}有权解除本协议，无需向您退还任何费用，而由此给您带来的损失（包括但不限于通信中断、相关数据清空、未使用的服务费用作为违约金而归{company[index].companyNameShort}所有），由您自行承担，造成{company[index].companyNameShort}或他人损失的，您应一并予以赔偿。</p>

                    <p>
                        6．7 未经您同意，{company[index].companyNameShort}不会向“{company[index].name}”以外的任何公司、组织和个人披露、提供您的信息，但下列情形除外：
                        <p>（1）依据本协议或其他相关协议、规则等规定可以提供的；</p>

                        <p>（2）依据法律法规的规定可以提供的；</p>

                        <p>（3）行政、司法等政府部门要求提供的；</p>

                        <p>（4）您同意“{company[index].name}”服务向第三方提供；</p>

                        <p>（5）为解决举报事件、提起诉讼而需要提供的；</p>

                        <p>（6）为防止严重违法行为或涉嫌犯罪行为发生而采取必要、合理行动所必须提供的。</p>
                    </p>
                    <h5>七、免责声明</h5>

                    <p>7．1 您应充分认识互联网软件的风险，您同意使用“{company[index].name}”所存在的风险完全由您承担。</p>

                    <p>7．2
                        鉴于网络服务的特殊性，您同意{company[index].companyNameShort}在有正当理由的情况下可以变更、中断或终止部分或全部的服务，而无需向您承担责任。{company[index].companyNameShort}会竭尽所能提前通知您，以便您做好相关数据的转移备份以及业务调整等，保护您的合法权益。</p>

                    <p>7．3
                        尽管{company[index].companyNameShort}对您的信息保护做了极大努力，但仍不能在现有安全技术措施下完全保证您信息的绝对安全。您的信息可能会因为不可抗力或非“{company[index].name}”的因素而造成泄漏、被窃取等，由此给您造成损失时，您同意{company[index].companyNameShort}可以免责。</p>

                    <p>
                        7．4
                        {company[index].companyNameShort}将尽最大努力保障您数据的安全备份，对收费模式用户，{company[index].companyNameShort}承诺在服务器存储设备损坏时，将以最快速度从最近的备份中恢复数据，但数据恢复可能无法做到100%。对因数据丢失带来的其他连带或间接损失，{company[index].companyNameShort}不承担任何责任。
                    </p>

                    <p>7．5 {company[index].companyNameShort}不担保该软件一定能满足您的要求，对软件系统的及时性、安全性、准确性也都不作担保。</p>

                    <p>
                        7．6 {company[index].companyNameShort}对以下情形导致的服务中断或受阻不承担赔偿责任：
                        <p>
                            （1）由于政府禁令、政府管制、现行生效的适用法律或法规的变更、火灾、地震、动乱、战争、停电、通讯线路中断、他人蓄意破坏、黑客攻击、计算机病毒侵入或发作、电信部门技术调整之影响等不可预见、不可避免、不可克服和不可控制的事件，均属于不可抗力事件，由此造成您或任何第三人出现或蒙受任何损失或损害，{company[index].companyNameShort}不承担责任。但{company[index].companyNameShort}应可能降低或消除已经发生的损失或损害。</p>

                        <p>（2）您或{company[index].companyNameShort}的电脑软件、系统、硬件和通信线路 出现故障。</p>

                        <p>（3）您自身原因（包括但不限于电脑病毒、错误操作、网络连接错误等）。</p>

                        <p>（4）其他非{company[index].companyNameShort}过错或{company[index].companyNameShort}无法控制与合理预见的情形。</p>
                    </p>
                    <h5>八、服务变更、中断和中止</h5>

                    <p>8．1 如因系统维护或升级需要而需暂停“{company[index].name}”服务，{company[index].companyNameShort}将尽可能事先进行通告。</p>

                    <p>8．2 如您违反本协议中规定的使用规则或约定，{company[index].companyNameShort}有权随时中断或终止向您提供本协议项下的服务而无需通知您。</p>

                    <p>8．3 您同意，{company[index].companyNameShort}有权将本协议全部或部分权利义务转让给第三方，但转让方有责任保证该等转让不会对您使用本软件或享受的本服务产生不利影响。</p>
                    <h5>九、关于通知</h5>

                    <p>9．1
                        {company[index].companyNameShort}可能会以网页公告、网页提示、电子邮箱、手机短信、常规信件传送、您注册的本服务账户的管理系统内发送站内信等方式中的一种或多种，向您送达关于本服务的各种规则、通知、提示等信息，这些信息一经公布或发送，即视为送达，对您产生约束力。</p>

                    <p>9．2 如果您未及时查看相关信息内容，或您提供的电子邮箱、手机号码、通讯地址等信息错误，导致您未收到相关规则、通知、提示等信息的，一切后果及责任由您自行承担。</p>

                    <p>9．3 您同意{company[index].companyNameShort}或其合作伙伴可以向您的电子邮件、手机号码等发送可能与本服务不相关的其他各类信息，包括但不限于商业广告等。</p>

                    <p>9．4 {company[index].companyNameShort}为您提供在线客户服务，帮助您解决使用过程所遇到的问题。若您有事项需要通知{company[index].companyNameShort}，应当通过网页中公布的对外沟通方式，通知和联系客服。</p>
                    <h5>十、违约责任</h5>

                    <p>10．1 您同意保障和维护{company[index].companyNameShort}及其他用户的利益，如因您违反法律法规或本协议项下的条款而给{company[index].companyNameShort}或任何其他第三人造成损失，您同意承担由此造成的损害赔偿责任。</p>

                    <p>10．2 如您违反本协议所述条款，则{company[index].companyNameShort}有权随时取消您使用“{company[index].name}”的许可，且{company[index].companyNameShort}无须向您承担任何补偿或赔偿。</p>
                    <h5>十一、协议的修改和终止</h5>

                    <p>11．1 {company[index].companyNameShort}将有权随时修改本协议的有关条款，一旦本协议的内容发生变更，{company[index].companyNameShort}将通过本协议约定的通知条款以适当的方式向您提示修改内容。</p>

                    <p>11．2 如果您不同意{company[index].companyNameShort}对本协议相关条款的修改，您有权停止使用“{company[index].name}”，但如果您已交纳了相关费用，将不退还。如您继续使用，则视为您接受{company[index].companyNameShort}对相应条款的修改。</p>
                    <h5>十二、其他</h5>

                    <p>
                        12．1 维护密码及用户名的机密安全，是您的责任。利用该密码及用户名所进行的一切行为，您都应负完全的责任。所衍生的任何损失或损害，{company[index].companyNameShort}无法也不承担任何责任。您同意以下事项：
                        <p>（1）您的密码或用户名遭到未获授权的使用，或者其他任何安全问题发生时，您应立即通知{company[index].companyNameShort}客服。</p>

                        <p>（2）每次连线使用完毕，均应结束您的用户名使用。若您未能依前述要求行事，则有可能得不到{company[index].companyNameShort}在信息安全方面的保护。</p>
                    </p>
                    <p>12．2
                        您使用本服务即视为您已阅读并同意受本协议的约束。{company[index].companyNameShort}有权在必要时修改本协议条款。您可以在相关页面中查阅最新的协议条款。本协议条款变更后，如果您继续使用本服务，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用本服务。</p>

                    <p>12．3 本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。</p>

                    <p>12．4 若您和{company[index].companyNameShort}之间发生任何纠纷或争议，首先应友好协商解决；协商不成功的，双方均同意将纠纷或争议提交{company[index].companyNameShort}注册地有管辖权的人民法院管辖。</p>

                    <p>12．5 {company[index].companyNameShort}对本协议保留解释的权利，本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</p>

                    <p>12．6 本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。</p>
                </section>)


        return (
            <div>
                {section}

            </div>
        )
    }
}
