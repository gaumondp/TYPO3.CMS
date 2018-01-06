!function(a){"use strict";"object"==typeof exports&&"object"==typeof module?a(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],a):a(window.CodeMirror)}(function(a){"use strict";a.defineMode("powershell",function(){function a(a,b){b=b||{};for(var c=void 0!==b.prefix?b.prefix:"^",d=void 0!==b.suffix?b.suffix:"\\b",e=0;e<a.length;e++)a[e]instanceof RegExp?a[e]=a[e].source:a[e]=a[e].replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&");return new RegExp(c+"("+a.join("|")+")"+d,"i")}function b(a,b){var e=b.returnStack[b.returnStack.length-1];if(e&&e.shouldReturnFrom(b))return b.tokenize=e.tokenize,b.returnStack.pop(),b.tokenize(a,b);if(a.eatSpace())return null;if(a.eat("("))return b.bracketNesting+=1,"punctuation";if(a.eat(")"))return b.bracketNesting-=1,"punctuation";for(var f in z)if(a.match(z[f]))return f;var g=a.next();if("'"===g)return c(a,b);if("$"===g)return j(a,b);if('"'===g)return d(a,b);if("<"===g&&a.eat("#"))return b.tokenize=i,i(a,b);if("#"===g)return a.skipToEnd(),"comment";if("@"===g){var h=a.eat(/["']/);if(h&&a.eol())return b.tokenize=l,b.startQuote=h[0],l(a,b);if(a.eol())return"error";if(a.peek().match(/[({]/))return"punctuation";if(a.peek().match(n))return j(a,b)}return"error"}function c(a,c){for(var d;null!=(d=a.peek());)if(a.next(),"'"===d&&!a.eat("'"))return c.tokenize=b,"string";return"error"}function d(a,c){for(var d;null!=(d=a.peek());){if("$"===d)return c.tokenize=e,"string";if(a.next(),"`"!==d){if('"'===d&&!a.eat('"'))return c.tokenize=b,"string"}else a.next()}return"error"}function e(a,b){return h(a,b,d)}function f(a,b){return b.tokenize=l,b.startQuote='"',l(a,b)}function g(a,b){return h(a,b,f)}function h(a,c,d){if(a.match("$(")){var e=c.bracketNesting;return c.returnStack.push({shouldReturnFrom:function(a){return a.bracketNesting===e},tokenize:d}),c.tokenize=b,c.bracketNesting+=1,"punctuation"}return a.next(),c.returnStack.push({shouldReturnFrom:function(){return!0},tokenize:d}),c.tokenize=j,c.tokenize(a,c)}function i(a,c){for(var d,e=!1;null!=(d=a.next());){if(e&&">"==d){c.tokenize=b;break}e="#"===d}return"comment"}function j(a,c){var d=a.peek();return a.eat("{")?(c.tokenize=k,k(a,c)):void 0!=d&&d.match(n)?(a.eatWhile(n),c.tokenize=b,"variable-2"):(c.tokenize=b,"error")}function k(a,c){for(var d;null!=(d=a.next());)if("}"===d){c.tokenize=b;break}return"variable-2"}function l(a,c){var d=c.startQuote;if(a.sol()&&a.match(new RegExp(d+"@")))c.tokenize=b;else if('"'===d)for(;!a.eol();){var e=a.peek();if("$"===e)return c.tokenize=g,"string";a.next(),"`"===e&&a.next()}else a.skipToEnd();return"string"}var m="(?=[^A-Za-z\\d\\-_]|$)",n=/[\w\-:]/,o=a([/begin|break|catch|continue|data|default|do|dynamicparam/,/else|elseif|end|exit|filter|finally|for|foreach|from|function|if|in/,/param|process|return|switch|throw|trap|try|until|where|while/],{suffix:m}),p=/[\[\]{},;`\.]|@[({]/,q=a(["f",/b?not/,/[ic]?split/,"join",/is(not)?/,"as",/[ic]?(eq|ne|[gl][te])/,/[ic]?(not)?(like|match|contains)/,/[ic]?replace/,/b?(and|or|xor)/],{prefix:"-"}),r=/[+\-*\/%]=|\+\+|--|\.\.|[+\-*&^%:=!|\/]|<(?!#)|(?!#)>/,s=a([q,r],{suffix:""}),t=/^((0x[\da-f]+)|((\d+\.\d+|\d\.|\.\d+|\d+)(e[\+\-]?\d+)?))[ld]?([kmgtp]b)?/i,u=/^[A-Za-z\_][A-Za-z\-\_\d]*\b/,v=/[A-Z]:|%|\?/i,w=a([/Add-(Computer|Content|History|Member|PSSnapin|Type)/,/Checkpoint-Computer/,/Clear-(Content|EventLog|History|Host|Item(Property)?|Variable)/,/Compare-Object/,/Complete-Transaction/,/Connect-PSSession/,/ConvertFrom-(Csv|Json|SecureString|StringData)/,/Convert-Path/,/ConvertTo-(Csv|Html|Json|SecureString|Xml)/,/Copy-Item(Property)?/,/Debug-Process/,/Disable-(ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)/,/Disconnect-PSSession/,/Enable-(ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)/,/(Enter|Exit)-PSSession/,/Export-(Alias|Clixml|Console|Counter|Csv|FormatData|ModuleMember|PSSession)/,/ForEach-Object/,/Format-(Custom|List|Table|Wide)/,new RegExp("Get-(Acl|Alias|AuthenticodeSignature|ChildItem|Command|ComputerRestorePoint|Content|ControlPanelItem|Counter|Credential|Culture|Date|Event|EventLog|EventSubscriber|ExecutionPolicy|FormatData|Help|History|Host|HotFix|Item|ItemProperty|Job|Location|Member|Module|PfxCertificate|Process|PSBreakpoint|PSCallStack|PSDrive|PSProvider|PSSession|PSSessionConfiguration|PSSnapin|Random|Service|TraceSource|Transaction|TypeData|UICulture|Unique|Variable|Verb|WinEvent|WmiObject)"),/Group-Object/,/Import-(Alias|Clixml|Counter|Csv|LocalizedData|Module|PSSession)/,/ImportSystemModules/,/Invoke-(Command|Expression|History|Item|RestMethod|WebRequest|WmiMethod)/,/Join-Path/,/Limit-EventLog/,/Measure-(Command|Object)/,/Move-Item(Property)?/,new RegExp("New-(Alias|Event|EventLog|Item(Property)?|Module|ModuleManifest|Object|PSDrive|PSSession|PSSessionConfigurationFile|PSSessionOption|PSTransportOption|Service|TimeSpan|Variable|WebServiceProxy|WinEvent)"),/Out-(Default|File|GridView|Host|Null|Printer|String)/,/Pause/,/(Pop|Push)-Location/,/Read-Host/,/Receive-(Job|PSSession)/,/Register-(EngineEvent|ObjectEvent|PSSessionConfiguration|WmiEvent)/,/Remove-(Computer|Event|EventLog|Item(Property)?|Job|Module|PSBreakpoint|PSDrive|PSSession|PSSnapin|TypeData|Variable|WmiObject)/,/Rename-(Computer|Item(Property)?)/,/Reset-ComputerMachinePassword/,/Resolve-Path/,/Restart-(Computer|Service)/,/Restore-Computer/,/Resume-(Job|Service)/,/Save-Help/,/Select-(Object|String|Xml)/,/Send-MailMessage/,new RegExp("Set-(Acl|Alias|AuthenticodeSignature|Content|Date|ExecutionPolicy|Item(Property)?|Location|PSBreakpoint|PSDebug|PSSessionConfiguration|Service|StrictMode|TraceSource|Variable|WmiInstance)"),/Show-(Command|ControlPanelItem|EventLog)/,/Sort-Object/,/Split-Path/,/Start-(Job|Process|Service|Sleep|Transaction|Transcript)/,/Stop-(Computer|Job|Process|Service|Transcript)/,/Suspend-(Job|Service)/,/TabExpansion2/,/Tee-Object/,/Test-(ComputerSecureChannel|Connection|ModuleManifest|Path|PSSessionConfigurationFile)/,/Trace-Command/,/Unblock-File/,/Undo-Transaction/,/Unregister-(Event|PSSessionConfiguration)/,/Update-(FormatData|Help|List|TypeData)/,/Use-Transaction/,/Wait-(Event|Job|Process)/,/Where-Object/,/Write-(Debug|Error|EventLog|Host|Output|Progress|Verbose|Warning)/,/cd|help|mkdir|more|oss|prompt/,/ac|asnp|cat|cd|chdir|clc|clear|clhy|cli|clp|cls|clv|cnsn|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|dnsn|ebp/,/echo|epal|epcsv|epsn|erase|etsn|exsn|fc|fl|foreach|ft|fw|gal|gbp|gc|gci|gcm|gcs|gdr|ghy|gi|gjb|gl|gm|gmo|gp|gps/,/group|gsn|gsnp|gsv|gu|gv|gwmi|h|history|icm|iex|ihy|ii|ipal|ipcsv|ipmo|ipsn|irm|ise|iwmi|iwr|kill|lp|ls|man|md/,/measure|mi|mount|move|mp|mv|nal|ndr|ni|nmo|npssc|nsn|nv|ogv|oh|popd|ps|pushd|pwd|r|rbp|rcjb|rcsn|rd|rdr|ren|ri/,/rjb|rm|rmdir|rmo|rni|rnp|rp|rsn|rsnp|rujb|rv|rvpa|rwmi|sajb|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls/,/sort|sp|spjb|spps|spsv|start|sujb|sv|swmi|tee|trcm|type|where|wjb|write/],{prefix:"",suffix:""}),x=a([/[$?^_]|Args|ConfirmPreference|ConsoleFileName|DebugPreference|Error|ErrorActionPreference|ErrorView|ExecutionContext/,/FormatEnumerationLimit|Home|Host|Input|MaximumAliasCount|MaximumDriveCount|MaximumErrorCount|MaximumFunctionCount/,/MaximumHistoryCount|MaximumVariableCount|MyInvocation|NestedPromptLevel|OutputEncoding|Pid|Profile|ProgressPreference/,/PSBoundParameters|PSCommandPath|PSCulture|PSDefaultParameterValues|PSEmailServer|PSHome|PSScriptRoot|PSSessionApplicationName/,/PSSessionConfigurationName|PSSessionOption|PSUICulture|PSVersionTable|Pwd|ShellId|StackTrace|VerbosePreference/,/WarningPreference|WhatIfPreference/,/Event|EventArgs|EventSubscriber|Sender/,/Matches|Ofs|ForEach|LastExitCode|PSCmdlet|PSItem|PSSenderInfo|This/,/true|false|null/],{prefix:"\\$",suffix:""}),y=a([v,w,x],{suffix:m}),z={keyword:o,number:t,operator:s,builtin:y,punctuation:p,identifier:u},A={startState:function(){return{returnStack:[],bracketNesting:0,tokenize:b}},token:function(a,b){return b.tokenize(a,b)},blockCommentStart:"<#",blockCommentEnd:"#>",lineComment:"#",fold:"brace"};return A}),a.defineMIME("application/x-powershell","powershell")});