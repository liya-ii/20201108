/*
安卓：晶彩天气(v8.3.7)

此脚本负责：
阅读文章，浏览视频
*/

const jsname = '晶彩天气文章视频'
const $ = Env(jsname)
const notifyFlag = 1; //0为关闭通知，1为打开通知,默认为1
const logDebug = 0

const notify = $.isNode() ? require('./sendNotify') : '';
let notifyStr = ''

let rndtime = "" //毫秒
let httpResult //global buffer

let jctqTimeBody = 'p=KAj8L0ZF5qmA=LJAg9DzaHXvs1KBzutYwhQmrsoMuunFyAGD4IBks7HPg6ztVTrKpJtQkfB8jCJlswrXJ1M7Uv81iu8GoNavJp8jKu6jRmMQNYaSSz1iNK_NIsv7GMxPkbwZ_GtQrcCa72rfrI1nPCgYHDl7c19tiJiPg_LQJzj5FzszyoFR_Eon1b7nT3r2Hax0a0uY6YohdDE9k8SfPIWb-sCes9BuO6PPP1QEgXFrQ-XdjvR77nGNgosJ7Xzyv8f6Xe1Slv41044jEcRdZ-NV5PqPkcczgMNk0PciUsD6iGGsZQwrnBa6uvbyi8GtawsP9hYNSAe1H1b0Vol88v6qWJWmCOcffLffDe8gd_chYRC5kp9DtPYQKp4lUixO8OteNd3lfgaXVsxqnrbsNp6wvabRT_F5HnNw948XUW0Sse3IbCFo4_BJAJ9vY1rBYdznJKP7sYKklb3OqLuLVdadu9K2QAJjT7jjnH7uR82-4b2aaB1j-UcmAhmyKJEv7S8PWIFQ9uc0XV32PdHnLYvKse1V3lbpYPj5dLLVgHjNtNuS9DFoIE4HlhkMk9pOC4w5Z4KW4cyYDwmljbWud1w2uKStj1rbNXxZFuYSLkJZZ6DA_gqHo1oF_ngKmqcN2w95b9hqSLsC2-SI9YlR-9so9QEsabD7yiUa-nQAjYxp75NyPLUD0GXjwhvCMEuK8a2_9vOOdfB344ZjCznoT-wRzqbQhxiSPft0TM2Tq3IN1LpgZJAwCjgjugeqoyWBHl-mt4RD89eI6_Uios3xXGZW96zL_rOw0D5Xdz3zphqzRIZvXdrGPqezhGzLXwIilChDVUZfxVP3-x13nQ9WDnrJbgTgUgvmFynZ9QP1ZUVYIlQvRXuKLxY9uXzQHSPyM_TE6sjGJ6kMviLBmMTwDmGGh-cs51p---acjwC4HRmebKg0XTY7tNOQpN9tw2T_5CogFQTcvlhXA4kz_G7Y9-Xk4RYUZaO9TcHg0FqgO-v1RfOC67WJo1Ivxox8JQgqrNKp2OvWdibwIuEK_rO5S7858ibyDyljFlZpRkFsz7oxj9vUdGQJj4Cu8-f8fXuOb41UtOPpCwTOpTbk_9AEjeDHS9Jmro-WVngQT7mQ5d2rbbBaMwxWvv0SeJCaXk6y0lTcTeYIJxsWncykLqN4dMGQ-mBH3GdK5DIjodecly4_ej6ZUwdewk5E=QO';
let jctqWzBody = 'p=mbnLYouG_x0U=OQqx_pkirknCqf0K6Z7XV07ohbSwq_QULAqpxl4WAybOTUkXo-19ySak41iQ1OMhi7d98m_YUNRYbW7yxASR907m7Y1JtxPHgflvP1cpfCKjVqG26sD3eblgsjGdKQ8ZQiXBywkytiUdGBfnQkCC64-BUNBKXEJv5thWVCWaOMckEJpwYYcOOnZFiKpiS7Q0r0-_vbL0N28A38g7IBzYPWPXZNNU3KPMzTrpv_gIykv2nAUVXWLCWF3W6HkXi25YGaTKvZp8tcgxvY8uWN1rMu5QL8sFo7Fmc4YSS0LkjBm_xy1py7zJyaIg9NLugZPtwtKjZwWh2QNp8xPHTlnJH2EGhefOq7e99DDXSSPvx83NAe28l6DyZCS5SHg3V7eCG_HWYkCbXN6BTo5WxKKAA2kEuRikOgJpg7xy-SI6QVXD23w0ukTSje2PEMpVTWdGPwV6A7QTTtAkfd0ieJEqETyl79CvNa7Ghnwk3ev3JRs53aa1DJ5TJjBQkuMnPZSSuFthQuhkStGvt8JZUxhqBwr06VreaQIZNQJiWlDTVgLTD63w56xYH1ktm2kIMpCeHsANDm4UUWUiS0oHA6aKK5YpWJT5QcHVKRi2yum5qkohHtqoRJEb2nSgEyT1BK6r08TK1_FvununIxXTBBZrmR5g-Ao3gYutJ9H_fiAZFqU9BRdXcXzNy9vBTQ1c0gSPhClrNyyRPAeY5G56rrY6N7gvEAeA23Uqtt-O7rnaNuuIgCYi3nkTIr9S2eEP2TXJ0AgHXHLtZNHFSCoiCx5McGieWcOuEU1B5XtI2b9CR2e1I3jIXlhQRsH7E_17v3CY6JnCQFShcdCjs1vLIy9GGMEDKW8-Vqa6Bl27wXME8HthCkMQ6xFg1Tt5skuxc69G8Vk5_SfDm7Y26xo2k5urIjFSjT2OZ5SKX-b1He6za8Hy8uVu1x1cf6R6XB-5mflNNPJk5j8s1Wj6O7PPtAnCC_TXugVRigjqu1fQXYzhVozQ1H5qsxSDiZBRztFKBnbO_KGyoXMzFlerAN-fVongm-9-l6qupH1zabFbDkRuyyXgTCjM0psUTl8NhUR9_zdixNAASHO8NFcTHkZvKIg74GAc7zH_RLr2Ft9lkbmDDni71nEcN3mCWyWKGw-F3ogoWA9ygwHCRXauXGzqa58qHDLRiQScovnojOfFuKoGntBCbvYgl8WVpwsazBTf-md5uJUm64mS1XUubbYXnxWhf0MPhXrdwdjcxHLtQzm8aGw=&p=MGN6hU7ZYPOA=526-kldn0fRlFnd5RqAM_yXHqSR2vz0oPqJ04oXuQeLePz_Cws1Id7dBX7YrcFIi2nnwMjguKCtCs10PQt-FclEXu45NY7w4qeZYiTeufhAT4Fb1gDSmY6Z8KXUp7PIh4YBHYE5-MnHS3bzkeR6FO6nOtcmqaZOaDoicMsjlti0RPvq3ff0MJ-dzTku5ywTwwX21U1l2iLbCP_gsuj5ssRuocVvu2aNTtWLSuYb8FKtrncAz9IEs7-kfUNJGwy7JYwg_HzGhESYKRpwPsTibxiRcfBAIvxZzcluF0RzVd0On2Y-8g94CexekSu6SmBUAPl7ZqkUXG7H5bgBxrcD3P0cEW2Eu9hthXxD1A5pOM0pmCj7eb0QZkrAjpuze2byEn9-T51TsEAJJP6N0MopRw5PEI2F2L7kUvNFFdjhRTwr4IibcN9RZGvdzxPsoFJply26Np5ELFa4z63ZyUERMmny3iLvoLbWg2Lx9J3FP8eKfhsQHCUULBuU558RIjfzWu00F76hBYypsub_auXvoROaNWUZ5QuX8D9qCnkq64Ls8Pkt9V6HfhBH_NYEpLV78fuShcw6Mhb2FQnpmyK1xwBDj7PuQgNZGaSS6lKeIgP0pOXQdqVueJGCcXN8kBPHPX8VnXR2hBHcWE2Il4gCRXtY4zwN-RdVv7WK7h8E8kb-IlcysHYTTBwLy6ssswNjcZj4WXu06V1nPWxtn9pPTPZ7linfuTBhSDx0YZPngadSIw8hj-cdyeGdaUeTGRE0kVZnhBXrQ-StSgBmpQs2MThpCETvYRm3_PssTwVDDS4YLJkI7xMiFo3pQLoNHCIVna0M8tYyUiOnt-2xRtY6sROVN1OEVKJHm8zAxxOSd8DwUblUhJHN9gh6GDb9CzwVLaN5iwKZ2htEMaIItpIcwrpXZbTWdVgnHkcFSxk_r5fr_YrwiHE4wR4UGq0ZuyVmtSztRgxl5vG45G6CcO7vHpDHGxElNZ4mWhhWkKYheCIl__WfaJC3NkONyx_-XnwCRojtuAYhe-JraEytZb6QlT5OvNsOOULG2nryZ-B3zXhiiAU_k0izx_3kWiOYRFERFMrLHz70yWZ1rUYLWeRnurmU8PHMpNPHtpZ0EXBgc2ZJjQoDBAWR6IFPJ7g2muhuoBnjS8q-21AuNUQhneOCpTfrr1TZw0O8lPVbO2l0fZFrkbpCqox-W21RxrKdfqlWQej4RJLv0eXttYN50K1AMsaAL-PlL-wWxWs4azbCBAGs=j& p=uGN6hU7ZYPOA=526-kldn0fRlFnd5RqAM_yXHqSR2vz0oPqJ04oXuQeLePz_Cws1Id7dBX7YrcFIi2nnwMjguKCtCs10PQt-FclEXu45NY7w4qeZYiTeufhAT4Fb1gDSmY6Z8KXUp7PIh4YBHYE5-MnHS3bzkeR6FO6nOtcmqaZOaDoicMsjlti0RPvq3ff0MJ-dzTku5ywTwwX21U1l2iLbCP_gsuj5ssRuocVvu2aNTtWLSuYb8FKtrncAz9IEs7-kfUNJGwy7JYwg_HzGhESYKRpwPsTibxiRcfBAIvxZzcluF0RzVd0M-mfJNEPPMqFL5yacwSaoAh3mVhh1Bj6adhRM1qNw1RCWhsGf_D3pjdrnbty09EkW9L2PfH_C4AmtJksoR24RyyEHQoO77eKt7ZwklDPyRDc2VPPXFqSbB9G8k5EpYB-m1VZsZOFeX0XtXNnQDRk8PUwCAGUP6kE8ggbwxNNVbwYQGswTE--3kyiI7WxIFXLL49HWwgnxuh9V33SFRji9CUrglPaU5ZS63gyNa7qU2fkvlG_9E-SjmoscTY2CI5Y2Y_-nhV0fAsZc4uwIU3NB-CZvZ4uuQ-9CwMbmWG5hbY-kA2KXUV6Z7l5_RrMk9khguuPbjD0PnAaLX2meumUA7ogz4U0v8JBbPpy_pFdyOfhHdAMwWZh3ui6MV1llHvAGIZyU7-JidZdI_5At16iABpgbYyvEgNr6Q2LlRX8ug8j4_Qrq3yr-kVEfJafBtkmFKUlRqqO4rfyuofymn9MFwisj2gjS_5bru2xJLPYzIeteYIp5TogcRCUop4n1A09WGQRiNUJxTczQyhV17XY3hpNafJEQZIOAZS41QYgEV1CblEPJYK7h5QIAuNcttXHi63Pm6DU6LaE9b9zC3FV_3OkF3rKNwLXgomkcH-BhNgCid7LHKSQ_el29NIav6pMD0dO1rHwXBPw1TM1MEs30UmSS6NZFnFH1lDkxEqUO-VvQZqdutneZSLn2bveXwX0EJ-b9DqqmTjEJ-7BbvPRkylOzFp6wSI2Ih4ibpZgqoQwyKogLJbc6u1X-58adnEkTxJV-zQ4hgFYC4y4O0pvmVY1fXfqLShhEjnl-90cg2FGqHvrGh7JTj0XQ4zZD6kNygNmMD453yss7MDJUV03sDmk_iN3yQrAtdWGi_IJshONxU45f3DNGCJYJeQWVKiFxcYELMfKlEeIAfyyZawN_O2QYQNwxsXhmah2FIyyAxm5Ixx4SCoEf9Wx-hAQHs6HE=N& p=5TptMzLWs9eU=uciQbPpLErmtPT7VrZKgcZLS5bhJ3yikyEKCmE-YD43hikhgmKiAgErLMXclZWUEoBjjZLKA8KKcg1yGwCQUxmwQiVqu6uE57dZs97MLjK23BT4vAXPCAOf2TQeYKATEQ9JgXeua_Ee6mIdCmfSYAlhZF3iZKAI4uh1tsD08GTboaR4wr__5HjbVqe2q_T0iSeCj-I0H4gSqjXdlt_cp-KtVjbOThDNf_IZ9UsVCKKwWSwnD20hKOBtGdZlIpeQr1wHMIrL3rbPMAgr27Q3Un6aBD-24Fxftcx8edTvdjpsLQ7E5zjyH_rAct9Mm8x7VhfWGv_-f2ETQZqYgXXqhefZIWJoDkpJbk0k-8EWDDLwJdGqY8mMxxMyS8JM7mLA5yubCdkiIxuenxYwLdInjGi8cCx0NucP6BJcs57K9eR5mgWPm53s30UfzUxv8d3egwQXulGYw_wx-yfn7gqe4xWhmeOKkeByuKNvPLAgt2oobwsKEjXg2Ny2lMVWp9ORbbAL16thfOfwOAnkbiltFjytPRXKWv9c53Zr5qh0xHHofcyZXkjKRi-gS3515oZwK9NWCvWrLal0JWEyn4UgtOzI0fEQl1EL5W3_-edaiucqhMKXluz7WzYgcxP0rRA_SYTy7T5APjIXI0fSub30KpSViZN92oSuLFPUWALdqy240GzP1OlbxphaRg735NltmdpsLP3xq2q9ngnWDb3wHeHTHSryTo3iCSwIwALD_R5558uCKhM-WwiNSdbOmtGwnvRAr_v1eraKsXsQLefDqoDZ7TWFA9pyLzUjxHo7r9wiCLOojkFsoZapj9keDhpDR0MuSuIWzyIhU92nZrYG8cFNi5txeNueunDU3OI6KLfOWjyel5YmozeRmyHAE4KRDZ_zDN8-EI_RHKrNf0U9tZFkllzIV3567-rJXsBfI5Xl3bW3Oze5y-qXC_vkS1y0JdZPn1YbVjEZmTXfKoqYnF5a319Gn82Dq8es-bTNWDmO6mUui7tqnqP0OMZF_wzEOO3yPWIb60Hn1s-L0JLKBtX0GnCm9ImYFw8YvUPPLEBBYmL8gts8qhP1CFxNhZb623y7AVIBMIMYahOPHNoiKCeZB7lSJTU-GfXXRnmaRP6KpkdmPrdJYN16RmlVFmWqEpypvWmGrWm4uh-telpOQFCPOa2B3HJE2VWu8F5KboCwxV2smgYFuBg==& p=Z9sMWI0zBeBM=16RlOIvA1yyxpZsxS4JARBRRiMA3cQ2i8evO3iW9jVyqPfK0dZCbR-rqNQ31pEDmhCWzzwQislB9ulaA7cljy-89Xp1HctrcdBr_TdCZknhzJR4AaFGiJejkf3oL6ojwBa4JTf9AerdtVRYOH3S1aPZkaNOXayoj4OtSV3YnBY3k-mQedCrueHRnot26-w50RD7AkZa_Amv6t05-7hlZHm4rZLgzXR3FlI6lRamLxU5XMJXnd_A_k1binT1mvVs8Qs33VerkxelPdlPRh6nlsNMszF2-gj79ZvkY4q13PlEumGR13FP7OY1dzkiS48JMUjqrcBUGi-bjq1f0_gjVUY_USIfEzTMX6R4R_CkkMFNZDKKpc-SUH35kmF_FnTzPuErA2XzR2wt9_o6JHfhR4H9cEIrING_KvkGfJZlTiD4tXh7x-JXp0flZF1jUM-t70Iictn93sTxh0yNjLFtgNZpIJhUT-FNG-5mJc1U0QFFakihdoK__OJ3XNlOKmh_mO4bxWsb-BhgGHvEPgZ1RZOwi2_yFw-qMURSXqixcctI86zKTXaXa7X0faWDP_Y1ZR8O3Y9kDEtOp4W1JM0EO2zLu6SJsupQ2g2MxCpW1UYmjFrWAXxiBZrWXJuzeQzhDeKJoWcgIvXm49rTFAzSAr-i1--hoWLhzeKMR2EC3sqtJXzzY1kV_WNvJrG_4-hbdABvCJ-QDav-5LhVtCY6gjesLo54iU789lYDkTW1hVT1TWcEnIHweGpDs_wOQs5IEI4Jgw9wQqYDoDpxIX6SImwBtAacgHj2GiC-Pnr7WFT0mwbeQ8l_GP8JScYamq-wEDu63A98AL9Y-TOjUhc6ZLgJTCtGELMza9hJH2JDzmJFO49lOLVByJ0HKUbnKax7LCp23bZ0XAU-_Q6kZeNfXEJh2ZFH9UOzzvL_YA5BjRsq47ema4ymJEFyx18yxWGK1sFsye9GlRtxd2TGaG9K2PQ8Z8weBe96TRyUWOLBPVsh6fu3g9ywCM7mT5qRhDGl2ACNPOBPSI_Gr6sJ4Gu6dJd8-YvKDDadRyiC7nDSBL4q3P-4AreT1nY9fU79jo5NBuqGnzScU2Bn3GLbVYXjZylFyq1XiaKpCTz2igbqGeGXOmGXyYKG3TZjCqiJU7J2u4QVhHb-Ys5Xbi-eyLcD0d9A46tO9CVQSVhR3gvmmEvo_aOhfhvgYw2p5Awzoag1t5ynd4O4fN-6C1OKemjVPBsoyjKb-Mq4XiaEannM91XM=& p=4OPWuPCF4ZFE=P-fbtyVbJ8dhbnnjEebGH-tIo_sUko6Tlkok_mvN0y-ksJHGexLhwo_wsWKijcOLUenOP9CdwbKqqEuDeqU7QmIFvxhZfa_pz5WPRKGXqNV7qbSCWzoagOGdVnFjgJDSOg2zTsHuz0DY-8fZG1-6qszvBrk7YgOau4mt6KGHdUkQpbfm9JQpfdtIe7ku0oBItwVubiRNN_D6oc3_gQPDPuLjTmpDvQhfdsjU7x5WRjGy44qDwL8dKKBNrEiI8Yf4P0X7jDoIvWYkLooO4-oGv-WUKH7-Oj9F_tpuH0SB6s1IJzDF1hpzdkW2gHzYgUxnWd-RG9piNpFm8WHto8kjSK25Q9jGdotEiCgzPgnUUHBQnxmaDcVM4hzE3GORf0BrhB826cszNzEASe0jOYd8GZLdRPwu4R8YJHRaZB9dlHWniQpjHfs7WUTRL-R7D7MBCw-sJSss5PbRmv0KkSX6K9SjxXZhSiQW5hJv3KMzdrKZ4gYs3Y8klvP0Yb27NNKBqbtW6clxIM5ApWvc6BvXZ8uibJa23vEs5tajqfOYi69h30TQ2OR95hseiefp0qp4Kbl1NElZyppRgDci4Vz6N41HtyZJnrZrzfAUrlTFaIW5mh4XIs8cYV82WjZAgbKGJGsVE8mW6NzlJqZHj_3IZP87GRYnUjGkLDNky8gytglSewWJOwvjFVx9XUtFEowxxQUigSwcEXLbLrKhLCNVok2bBogobFdmzwtyWZH7Dn6q0R_SzwGrv6BQpQymtpQil67AC2ugFoO_oXZp5lWLySjpxJ3otcMzE47zZMtmyZDWAi85Dzr--QxjGvmQznRpYFdI1PelEN07ldYHWVw7U8tBRMixX_B4DLmo8a-hG9rejaRvH1xv2sST_NVly45FPZEXNGLNMs14bLwNKt0T1rUT211DfnV_rgwk5R9ZUx2F81gET1wBUJS_RriBfnL5w-50sVBAKzaTi4_7LYmQ7UFgJgANxAnwl2tn3AcoiAZ3ni5dClaKL-FoOCFyJuPHOXoUYkkycsjdx738B0tzF_1dUCILiWgbseWSUSfVW_fpwjflHDLcqZZloargdhHcRDVjaEnd8ghPbAD0R_KX1iCmrTrY2K1dAAtoVKUNMzWPtpd47bPUeaMQC0CfObZVHNzDdEG7B-G-MX8ZADIw0hwTDRjzbTFUfs72WGsdLLe1H9qa1FTan9cNN4SaIQG5T9V775RgcZynSqw8BsIM-cHgRIq9mNr6vhHddM3wgGA=yf& p=X9XQc_gCBVVg=cMsgU87LiqwX53SHNCknKdEL_kG8_V3kqiqyAcUREjoHG2Lgnw_t9sPnPBZuQV1q1S_5WLiS3fmfRhKCrTF0h0ipZ9PfeFvv1yBzAtWcDkJUDckiU9qaOr0QOAPnKAEtXeYNB4GkWUQyV-eoZnQO3HSD0wZnz-QsRguQAvCTKijRnXLrpZqlq2gtUzHgumfwtVm2T01VO6d0D1vidAQD09OoPkAyN7izv2NfFlGafifnTDyMFggIfO0FV8BItiLDRh43mi3X4QPabJ5tr6a55mfwGx4nELinqf0GnpGlpP-0KpJcFZdvXNxIRBeKrEiHY3t3kmDnL1iDGo04rOgJvJL84dU_rEXNdZfHOpFtGbtxSAeRPycQEzecZArXFU7dHnXjhBI6f13YjvlpWrKIaFyhdCV2_7YiYCrjXhFW9xb5rFr1cMMI9IOGE3yp6-emRYUra6POCqTRinqi1EuaqitDWBqZW4L9xmgEHWKGFpnenhqZlxwKPF5nedrzheenq9pPdDNzJ6KfwLNFjBibv1mwPS3NW8uRB9lpk3cXUKsqyq-1hogPksaewcVZgN2jTPHlQLgsSFp1IbMTl7iE4GTBzSNbRZH4OwKfFy6ighiXJ25_8LOnZ1ADUW0OMzQly50o99p-o9Lj2WNtXlAWpvoy8h5eJErcgzK1EYpRLvryAuaTJ7SyglXgar7QgCO8rWogDq_0EdIM387hf6xJSKbP_wZA443drOfjcPX7uAQ1qk-XuD2CvAC8S2vOxW-L4_-D0pXzTuA8m7G1nHFTe4PWw7g3AGxtTNYpSQQCHUhyK2pzIW0rCRadmFJydN_LpXZZ5vZtTK4h9689xrq61pKkAD82O2reNNYb1SJyQT6Dk9APDYwQeeiNcLynKSROuHgzLhrfUzUxV8iAD8v65E24viWQS3Y30g_FWjrvkcV_SHAPfQX91AB6DGE1s0RQJzXOBRrq4a6MtrFuA8Cj4prs1jKFpGfK6YOKoPNZR6T5z0Zl6z39EmcGoHrkCha3aVrBNX_WWOG4ul6b97LxDnotmjND_rkRKzoGEg8eskXUA_Kf5vdXn2YAPTw54IFJdCx--SfVKbszcHbxlTnc5XKMn4Hl_id0AnMUV_mEEzXzQTmeyJsRhZsQlc2XF3Jkp_-cg7de41kCXtONXcBLGfa_ZRv6sU-2sGYjCXrvTj3BAda2ldMeSoF7g3h1Ge9haTPjLWuMHk31_r2ibQCntr63YA1PqQUpBpRHF7G6v-4=ro& p=yFsSOfXcbejQ=V61I_92UeXVQp_xOowHBwUwG2Lb40jOCjkv74lgRO8kcxaHSzKS2YA1W4TEu8reAwa2_h0WHVnFEMje59bx3aMn3cV-UZdMpwmh-Hy_OASH-Jvti3DAkHYmYg_2Z1d8ZGnabDGTFFhLGQBUvOcRre4kj37dOQwbloc_JNxKo-Nd7vkGxpHAWwCLmQMsytI68AhN4Wt7HvK2XIwA4zePulcejH5qPKRvfQapqRhZGmzcm63iQrSO-kkWLoKBniNl-iayzp8RKFkbMlHqQ3T08wAjPc_JhEnfTmtokG-jDbkeQSPFPSQMPrUC7U8iuY3ADRx4gGj-D2FJAje1bITNe9Iy6dYt8RHoCueVNWHKSDUZCxjFkQIvhVPmiTVY_G2UoUyvHHyanxmQKF9V66XO0Ne6W97yBRfXaRepcygMJN6_HJksGf3hngvQK8ATlnCNINuDpuutLq8L9ARRnp1nrpBdqKQmuwvxe29ci2-82Qjcx7jC2xRBpPx8zcA0xRXRvV5snLttRxmWRSvv8chmCGJNtQEQ9eUAYmq3jD451wzmgytBPZk4nGfRdep-uOXemIp3nicsx9E0dE7BqDhZz32FHA0JROquallo6MNznneXsd9e8IVKXioXB0l2aliEXBnMcKWiQHvcmvWxs3ASaNDZjkS_ZH1qkpA-ZmpUlB_uDsJ9v3-EyLrPjdXvz8Nqzazw72hQnFkOznprbMAoNYq3f8A_aMVqZ4r5i07NqKbFzqEo20fl4gM_bm_GHqnU6JmiSzyHmgqUTk8OYz0bJKHRAkifUOZNZVBzr0C033RY_wHWEuBERCUncas6NgOjjLcoynrPc7TOXQT30tgUgRM-AYPaxLsfIjcHIgpoE7Si5XFJ3ObUpUCVc6JTe3XH9eC-9cB7EmemURinjj-TSLluHuXbsZ1l3QBpPbhxeVIUtSCZr3RxJdzUhxK3MI2-oNDX2tj7PVvZ5A6haNPZ6Hgrcz3W45HwpBdL1zFHzb13agC6ED7PbkUcmPScd3YpTLIYuZSCA4D7p4U5gqGLSXJKw2w8tWxAPzH2bp1Ef7wPOoh5sE9a_85RYRFZpGK1-xuE7MXrmt1q4tOc7L3dCh9EsfBtrA3DjozyxjCclIrJUw_0KQ4Gl37Le2LFg4jWOYees_yqqTDeCutfbZdoWHt_IPCeNLwAdeuFVsi4YthZxA5io446CPtNAE1fbB_R7esyAZloHKEC9VxpltCgroo5VyL30pp3glCij4y1XMd4=t& p=HOPWuPCF4ZFE=P-fbtyVbJ8dhbnnjEebGH-tIo_sUko6Tlkok_mvN0y-ksJHGexLhwo_wsWKijcOLUenOP9CdwbKqqEuDeqU7QmIFvxhZfa_pz5WPRKGXqNV7qbSCWzoagOGdVnFjgJDSOg2zTsHuz0DY-8fZG1-6qszvBrk7YgOau4mt6KGHdUkQpbfm9JQpfdtIe7ku0oBItwVubiRNN_D6oc3_gQPDPuLjTmpDvQhfdsjU7x5WRjGy44qDwL8dKKBNrEiI8Yf4P0X7jDoIvWYkLooO4-oGv-WUKH7-Oj9F_tpuH0SB6s04p7K4P3q8dohL_OquoewEjNOJfFS56cTPGqqKkUx6XEZxUyWx_5BwSZCLPbJvXDSprhdS6aDi__7sMiLTd27GZrY71nccO3dHYFN5_yDUe5zp55HQVde00xk0RK0Np5jbwUNYbK1R5QsJJX_zsOyDByeWWZJSE7y9Ez-HZkT3Mr_Iz0gUnlDVEhi3P8RnPjAbl_bYe8d0cUAoE5Um5Wn87aA8yy2_jo3H82vmOMyzwJo0Wt9pMzZJyaWoG5Gxd_W2qSie2xUdoiQaewTXHkzu7RDh2wIZq55ZLUTB72KY8ODzMcalGaBydhmhKTlzg_CYrH4AZb3nR15gwPTuIbg7VDflSzpBFefK_CgvW7dRYEYLFdgF6_SUAlK5PfhbXkC8L0_16E6B94Ups9AgqJh4doiqYPLFTg-9IDZU-fUey69nD-pKBvDfzs2xEKplndiMWeFklLTm8GZd8dkOG67IwP860fnCz3-P2SlRp4MXp7BARD7RR4-DaAylMd-UL9ZlnS18N6bTs-q4FNaBTKgYTh1hIubQbGx-QchF44Bu2AGgqkGKLup5nH4YWNwZgVUgqf_BWJZaMFsFvLpCNsx50umcsfUuXfylU2DS5yXq_7DSYSNQP48XVnrSGTaNJSxiFlgMmHCb7t-abh6ojbAJcaVm81jMq4Ta9A49nn7WpLqEDMIq9K-tHYu43iWMf_B_-Xd4MRIXPhGyLXg-zXV3ZH7ZaBNiI4-4LtUQKJtdL7LMUdWnyVgmnQ4q5-sfwU66qWkEVXgTnlW3CrfzJUvti1dMQxR38qT_DPbIBSPIVt69C2kjJEJjj6_AqYyTogHniHXHC7Saw3kRlNt_dtOTY4Lu-ZuRpNSh_xuHcBvzJhOt0QvmElp92ZwyM0KD-3JO89zbE24lu4vcMhbR3TMro3yRb0rQlp41AiY6LrHSH47kImqHrl9oxMZ-AcdyXBw=Cl& p=kGN6hU7ZYPOA=526-kldn0fRlFnd5RqAM_yXHqSR2vz0oPqJ04oXuQeLePz_Cws1Id7dBX7YrcFIi2nnwMjguKCtCs10PQt-FclEXu45NY7w4qeZYiTeufhAT4Fb1gDSmY6Z8KXUp7PIh4YBHYE5-MnHS3bzkeR6FO6nOtcmqaZOaDoicMsjlti0RPvq3ff0MJ-dzTku5ywTwwX21U1l2iLbCP_gsuj5ssRuocVvu2aNTtWLSuYb8FKtrncAz9IEs7-kfUNJGwy7JYwg_HzGhESYKRpwPsTibxiRcfBAIvxZzcluF0RzVd0NIl3lk8ln03tKGe2rx-hTShGgHjv2QqEE5aZPCQcbfbNkAQV3D__bMAZCWq32tEZgnPWWRHuzwYAxlIAXXTV0zAdTLYvoM05bGqpqcNVrEgfDIEg8Bj10-rZehufoOb25ck7tLOfEHKpPm5l8_Rswvlz3svKFUBojraASzPPehvY_pvkcABrn3ioziUxll3KOdf3l0L-YtUFoLWYVNIUrlRyJ9W2BppVA0Iz5ViblfGqHHHAvBpLDqoprBq9P56K82kPw4bYruP2DVc5HWaBzGKrk-kA9-Uq_TMu0sFKTDw6fcB4CbPdaKBXAgett7CFliZTprmHMN-vx_Cy7rn0Em0Y29ZrzDFiVDPOHo0cuaDbz7HiY4JjbcKnZzcD9ChcltVxZOEJ7XtQB3wHMpQpN_xvye6CxTMajx967OchQyONDJ9vRmVsPSILb9W6f1xO4oAX2OTB8n-0epETHeBhGH6WvlljDRbabJeZbRdufMNrc6MlTN2-lQUJatAP-Y1SjzFbm-CuIjbHxW3Zx_j1ZeAFpQGNT3swG3dv_qxoIiLPjymaX4ZpGUoRArygmdi2npi-HGvQwm0UsE7svXA89J4H09fd0mjXY07nBKfUUq97CszRNoUwLrC-J94XZ15qW4CjKYZJ4K9x7p2yWuvhVz9ikdcpDjMEbnzt8pd_I3S5-7jG1FOpLCgi1Ne-1Z7-gYvqO-zJvd3RvslkxugQBd_c8JM1LiW_LTyLa2bbgVvn0DlZsuEuJ1_bAJ4RIhuFcRDUzKOjqoDMfgwU1CE47RwHQ2k0L1LQe2fIv2AsTG10HHirR2Jl6VhDTYp_oKsdiz7sw3Pgf7nBTG8sLJ70OLuzysmijHp8cXVEe5UPWEPyHC3a7u65d2K-PtewoT60_r0vBSO6SE35yEWIA63sWLO5ydAczlqNQ=q& p=T-TH-oVqMAXs=Jo5cyCldqpRi6PPrwcWoOG_X5mMn4QESxYaxOAZ8RN2hIxlf4m5JZ7cdQtVdDtDIMc7_CPaJg1WbQchWt6QsCw7HQPzD5MEAmTA0kFlePXX5K-ZdDHw1j48PAGANUHQklEfzHMx_Wb21eNTMF2ptTz8BBhXpUZJB7cBGzbysjAXkt1PxWj7DZrK7hZDxGY0PkQQjP7rwnHTOx_Gjy4FQpR27f3UK_7VvOR3yuIC9St0eAsxUwp6yxBWQeVgLOADMksaL9Z733qpM1uuOlq9toirqhyVYt18vGhZYXaKYQrnKuylKl2Ne2qnVuybp11U42L_zkzLBA3d-xm9w9lfSJGPH9yRyl5qInzkJ8nt6A1BNaT1lr-PQd7lNGsOvPsYvTSc8P_nCE2wnZ2SQbMBjjNNK_p7proP_csw1LyFFZHCz9YxyXYKiGqiNr7jsanyX0OHmr26FmfZ-nyRlnKM8DQGJgGyFFWi2-kXwY85HU46FbtAyYVKcocUZjkTlpMFRLyLEW-DbA4Y0x-UFYyo_yrXn0TpRCuiOE_VM3LHZRilmERtoBWCjFvu2DGemhkCVJB42kqeflyg9P2KYsX1EjjA0V_PvIb3fckv9HE4fvxUqWedAqySG8v8TE8k96RPivOwenCteSbE8XQCdvqkzvUSidZUbUoJ5o3Cbb6mRnnz4sHcVLCGC2JG2k1itou2eZDWpPaaHSYQknFN1J9rBChH_y4oPiT3uw7RJpogjH3tBlDBKZebtV7aEnUIGn9s2YF8Icbp79DA2dBpZVbvz_dvEBa65uROvfpT4H7U3UJRhfw0HH8e-3Bqueh1irUDsYvVSpu5eZ_MzzqyiL_XU5vOebwIQsWPgiwd6P-1NjDSiXrtoGTzhGf4JjGqDlVxSpytJ6OwFVU5wZUe-55xZejedD-m69KMRwL9Rz0GMuvEp8f_2Va5wKokmU1ZQSbDIYkm8sqn51n47_qluPe83_sbDPI6eSH3NG8yH5CR2sN5BcyD9uVEt36Rfcphs6M1aTwRGsmNpWfjGCoo1XYUngdH6sRUPc6rquNNpg6cOu-BGa6k90dgbs76T5HVCwDG6bwMMdMZ4RQS0zLNKCW5JdWyqG5qsw6ixsfIhBCLuY1-iMgpBCl7n0Bb_sCSPCisWrsxGZzPFT7OYdnZXKdn-bXbRcvbxagBqvU1pQSgiSpPNdE8be3nzFrLkBrWRz6Bd2hHYPELPbHqiSocFCYAYRqajBIo1r4mq40JNlWbkNU8=T& p=5TptMzLWs9eU=uciQbPpLErmtPT7VrZKgcZLS5bhJ3yikyEKCmE-YD43hikhgmKiAgErLMXclZWUEoBjjZLKA8KKcg1yGwCQUxmwQiVqu6uE57dZs97MLjK0r4K3qcW6RaWDmgGbbT72sgZjAsYwpvDPSYBBmwDiytydefhChASeFkS7GIJLISgI_iPcGN2doPWF07Ek4hyizJoEKXbWQ84thEWOPOg4Il_4FfjNw8eBHP-HDWWqz88g1yrOqiTOCwS5hqttEoaRszpBFlvN_sBTBp9v6ygCtImC1Q33TQnreMKNSSaVMPZSyt7ypEdtSBuKTc-ZNvptR48idFyeIwqdEe7g27JsOOPAwHRRZskq73K_xsHEmtGOmfYLWb3qT9fw6V8Z2dTxGpULAKPsziiyBgTVo08Jhv8oE3h7BY0KTmxX3JJpt0uPyt5BjyV22gLxq_Tp843jWoNrrw-eK9xfQrQG6zY5tPqCXwMLbdafoRBv7KGJ8UR54WgiwKmaZFZA9tttzyJusq7CK9vDPPBEcg_1PJXVgNrZZYyZ8sG1AzuljOOX-ye0rBLpcy2pWxGzC_N2-b2xH3IZ00-_PPDPwP621sbrLMUR2ms9BqAeIhbU26MJSjn64FvPqlRwJTGVk8_vzFk2cKu_Vy36ZeJSD05GRjgYo0YrYX-1aFhdOpLnVQsAaayWrBgUP0TWD_MJY5kBOGP6TwyTTVwjzCZnn9fZ0qsaEqx1vqbq3HWtmk6_jZSwZNpekONy5WmGlXBWZGEU_gW072ZPrq4pHKSAYVOVFnBUDvUFEb8Ywm_26VMR09z2Uj3FGcQaFudOSUoruTt7ePYGp5ADJQfEJPoeX6A6HwjUBdW0m2VrBOA68orNcPriFm0fv6ilMnUHJqEst1RzA-DFPI0ViWX3PLEZXcIK3sExCu-uia-PWlgkTLwLTZGpAtnhgpJUl36MQYzuYzEnGKAJhn8WyVxrE0z2iNMY7s6mm4wSnQ4uKlU53Jc2VxNFl1LcLi46WOdSl4p0DPe786SM00BImQY5-l-OtoTQxrfEgLvctkof_Pvz3eNzc1MHPuBXWGOrRX_mnGl6DD6vKTGZ63eg7RP8fV5fwbbFpWSHcQ_aj7vDaFpLAP_rit_vxOyPlfrKKL9IIen0IwM5VXul5nsLNmCe5yb_HH8i9LAJBXOiKTu3Gx21njNYrlvhU7g_VNxIq6azl_oUnsSrDLAHn_Cf9SLApFkUCPe4rkeap7kyxNSfhlWYVcWw2H0-CeVk=& p=n9sMWI0zBeBM=16RlOIvA1yyxpZsxS4JARBRRiMA3cQ2i8evO3iW9jVyqPfK0dZCbR-rqNQ31pEDmhCWzzwQislB9ulaA7cljy-89Xp1HctrcdBr_TdCZknhzJR4AaFGiJejkf3oL6ojwBa4JTf9AerdtVRYOH3S1aPZkaNOXayoj4OtSV3YnBY3k-mQedCrueHRnot26-w50RD7AkZa_Amv6t05-7hlZHm4rZLgzXR3FlI6lRamLxU5XMJXnd_A_k1binT1mvVs8Qs33VerkxelPdlPRh6nlsNMszF2-gj79ZvkY4q13PlF6nv86_Lf1N-6F5jbvH22vTdveEBVc261yRIrO-bQ6FO-cceWPsHtkMlhM7LFWTxVmgtZ4JcvRgpFtPr38wCp4pe5TpHnnjjUGRFYr0LQeBrQkESJdW5-ilueWYtq-JX490DPzfaMexKcraqMcbGcbyGAZh2bC1f6H6zaIbb_LozSd5CysDMiNQuDzPDx508YeyxK660iJjDcDy8XDmaUuJOHVb-L8iJMt1_-Hrj378_kFQnIUjE1BlDc7uPoR6vq6gx4PRIYE2GSWQ2bWjbnFiW5AXKeba0ryliomc1xGEBvYdmqaEHcTX9kcUkTANVbvpTAoDeDwxwb1UJdTacSq5q1Nq5NxLyBsgkeHhcjOblBL2u5NgofVk4p0V1DEa4cy8QeHC2BndrYQ39x7Ea3Va6TQxCZfJEIKv8VSo1vZEalB1j_K105dTH9Y3eLvK97nPLbtN2CrkW2ud5jHgQIdlVsRwzCP3muOSUNIC6odD8eGRFr7D6rKipBHEvJfb81BCtfswEz-pi74Zg8jH0chac2N2z6gHlCSqdbL3xzWirWMRuvCoC1T8PNJRO56n4YBIt6Z2l0btH-CHjW3BwjDWACr5hkmSXt_eCe70mZrHhRpygKMWCtgyZ3WdjD57HtkJ-WXed1GoBxVwVXeHMyNXrQCKiZQ5ApCGAWRXi2GZXBm97ZFeUaQVlQvIQRLP-hC5hIX-WRTQjDZyk8Ae3rez2rQYURYhOZjMLjQESP-DCMVpqgrw3d062K3glQB9YiZnzIARhZ_CZ8MyGtDtml-VNGWmSBXhLTqFZL5yFzYmb_bpY1KpNQQI2QDQZqUHRxusHiwIEDYCn4TX5dceQVzUpKwISJ8hl5h70oDVYen8Wj5RiyVrnFGuifCpFzmMsoJaiSZKevSz0jaHPmsDhWjuE00BkjyLtScjONbxr89yHXzRxhYO5IP1DUc0cRHaZkwjU06gDEL5w==& p=P9sMWI0zBeBM=16RlOIvA1yyxpZsxS4JARBRRiMA3cQ2i8evO3iW9jVyqPfK0dZCbR-rqNQ31pEDmhCWzzwQislB9ulaA7cljy-89Xp1HctrcdBr_TdCZknhzJR4AaFGiJejkf3oL6ojwBa4JTf9AerdtVRYOH3S1aPZkaNOXayoj4OtSV3YnBY3k-mQedCrueHRnot26-w50RD7AkZa_Amv6t05-7hlZHm4rZLgzXR3FlI6lRamLxU5XMJXnd_A_k1binT1mvVs8Qs33VerkxelPdlPRh6nlsNMszF2-gj79ZvkY4q13PlHKwsx2YuXZFhaSG-fY4JrrPaeMzqYYjDRxXM0aBPbfleJcAu_89QoyuHA-hDQXJ0mMszyp1SScAksablLxhSSC2ULTEheXdQsprlTuCbLPK9PnyUX5SxGCzHVCkUImsjYHEtiWahkOtrU3Zm2Ph1pfxzILrBbULQlEO-0zb0AOCijxN6YEpVAfQpt2xtQKAxDVqxP_r5JYZGwGqMdU0dToTPWNXGTcZKNFgkfdfkR4ZcLHEDcdTl06G9Cq8532k32H1Nl6mamFcMmTApFoMbMTKSXvv6uU7VyWaRa9AIgugNbQoOvPC_reygxZdzEJ3RyGMX7VHQTbouxhHZMv8ruOWTieiX_9abF-zTjqnaBkWpXMs-bG-8dMmuL-dsuBksidTGnllLtIP138OJtOWGpY901igpvnS4I9-Gyf7DdjXLoTcSmL4b7auUC4ahdBx10IYOLQmgZ3qavPnjwniBIXB15XG1Sv9jefK7o0sisaOxGkp7_ZiDoemQ2E2xUhIJaDbxhKeoQEoEaKT-4msJ0wev0a81nZ8oBjbr4wwrpP6heC0lFzxHPj5dlT6uoZRKaKwsXcC1wtqlDIjh7I5IGC0woQAE6BZWex4dZOkP3BJ566EbhG_IQ0xe5SF6OoUYQzu8rW3YVYOvK3bZLp6DRZoT3UjRKqbEkcJeAiI6w-5NKIGXa023sEthb_GLKRI5_1deWNqB6BznZ8RxntvRig_hFm4894FTLXIFUSzTo1rdJQQqquZnpbqAgnFRvg8s0adKUjj2vV5dqvPNC4x5Byp1T2HZUkUFveNq9qJotbn7y0h17ZxE3dIHACjqAb-0Hr4sNsBhcNhgyKDHkFFNyRyyJLRTRGkCj_IK0xJfOiVjBbf-WNDXqtoWaaXtURpGYLc-3UgS0u1NGTLH0d6KFyW9QnFE3EO3Y=& p=yFsSOfXcbejQ=V61I_92UeXVQp_xOowHBwUwG2Lb40jOCjkv74lgRO8kcxaHSzKS2YA1W4TEu8reAwa2_h0WHVnFEMje59bx3aMn3cV-UZdMpwmh-Hy_OASH-Jvti3DAkHYmYg_2Z1d8ZGnabDGTFFhLGQBUvOcRre4kj37dOQwbloc_JNxKo-Nd7vkGxpHAWwCLmQMsytI68AhN4Wt7HvK2XIwA4zePulcejH5qPKRvfQapqRhZGmzcm63iQrSO-kkWLoKBniNl-iayzp8RKFkbMlHqQ3T08wAjPc_JhEnfTmtokG-jDbkclNO-8iHZBJdB8RsXJv4nQPGSnICKd-LIp27RJn5nUPiaNTLzdPzzwU_PMF70Ie4iTL22sgl0vmjKfeZCrKCEFENscMY5qpunwjydLDdApVrvh-h43zIto5dEewGUUcOEEnYuDhwBULIOCA_J5xsHYYR54dvB91c2_TniarCpkOWce5PyhygQ9FUY5H2xMxySd2bbdGy1tBu7YAc1DsbdFVqixME3-pQ7-w-Z0la7GmZYtfy6qL81jiuLQ7oD_-6ufucueXWlgaez331Rbp-67TkOFRqhWj3EhHCJYqlv_SWyeyl6E_AsFlpTT4g2WhztzLq1Xt6R7rCEjZQ5Z_Xn2PhGg2q1ccS4QY05Vx3eOYxEtVdfqptQ813RUQy6NRXWQIuF-Zks2wjRK0ru-p65pKK-gmlsrS3YBYAfm14pWxcuZiOLkIyKrGMisbB6ahd0YITMDMNFUEkKVBC8ZEfZeWykJC1Op2H2pT63YLUr--dnE20AgaboUwEN-bnshwXxp2n-NWUMWtf7IK6owpfa36xTRyBYziSvpwMyMXoS6U_ywcNhUTYAZ7NpNYPSL5NHsl2U0qi9B3JQKHUIcm96jawoFyDM3SrXh33tz6hu7daKbL-pQ1jD_h0qOzU7juXlKAoLxPDLFiQVB1I4UxRqikdCOeyL__jmskoAKPVIRpVEZQOAQHuQQ8D2i0avgR-G-YZ7xp5Diup98pWrwaXbRdBhA1LsqNXXvsTBubEtx5-ZKt5KzzfPy6Kd4BCyNMrObe-yjaE2AZmjUcrX0h9WSop-u_0nqx-vgsXzSa7lOjCwr8wqlnEFDW0sjyZ17lzuez_7x_lyw1YvYqcJXrX0giNBQlKHk6KYcdKxZCv3FAGrNWghND6qvpMnyT_wYmdpG3jEG8c2r6NbCy6b59khEvQfn1RFHJ31riNSDEzgj6GqVVAPNbRpUS63fTPX57Qo=D& p=YbnLYouG_x0U=OQqx_pkirknCqf0K6Z7XV07ohbSwq_QULAqpxl4WAybOTUkXo-19ySak41iQ1OMhi7d98m_YUNRYbW7yxASR907m7Y1JtxPHgflvP1cpfCKjVqG26sD3eblgsjGdKQ8ZQiXBywkytiUdGBfnQkCC64-BUNBKXEJv5thWVCWaOMckEJpwYYcOOnZFiKpiS7Q0r0-_vbL0N28A38g7IBzYPWPXZNNU3KPMzTrpv_gIykv2nAUVXWLCWF3W6HkXi25YGaTKvZp8tcgxvY8uWN1rMu5QL8sFo7Fmc4YSS0LkjBm3zQuxxw1dTkNmVMWBJqkSl4MQLrfJ_tF_UpaU1c0UMhIAcxy1TH8zEghSlJHCJ89hbBUNFNrxWkgM3qYXnATjY40t2YhSRRdPSJvye5Xg_3DPuOMwGL9HTUI3SqesSds5uAJGwSFVahVnZmjhziW23amOCCchnCRnZatJ_BR6lV-hpeDZ0f0aqKXOrROBfsQXfjE-WWYRuV87OX5VHfWzlwrf2rlEr6eShMPrywuvnsJH5Bp0YDLrKfzhcxTLmOgZKIbBOnqO9SYxZ_EZuZYi3Eb8z6riccJ-nr2-OPg7SZLT_tAN6t09VmVJuw-4NbBXrwIntXngAuPo0Y4OztYk8eTT-pr-NgaRGNCkLUEejVvci9AJwbwpHhQkHhvHGkOnQgLnxeehxsQVRcy1kxwl9IeSBITo1y1Wn0lfRAJmhDTyPjXKxVtAwWH5FKDy5WwavYe5su4PD0xWhghFmclQH49tZewgI6fNl8b7b2POktWHl0AT4SZaJHPavAcLwuO0mQvRv1oUh73wKdQ2d-O9lzGf_0QipeayCiIfRsZoyxUGhuc6CghN15gS1XL370wH2lMZZxJh1ojhkw2lN7xjHS65-DomQr0W2Yu6BcoCyoemwf1y54CToCH4LTDtvYAeTCVAt9uTSzo6vRrEEuEtTscHzbibobppoDKH-tg7eeZEAhGy09lG8ihUDn8z4s0f1rHivF8QyhvnwzDJdjUrvTYc6CJflJiQsKTYYbLhifDar8gJXZnMRVCwQsl3OaImQBKKuKBbukaFgEJVpw7GMbKuHwpFvfrqsa8Jmy1LBPdS34o7xoru80FBam0CafmKt1fkd2kymJHip9LMXyzLnwWTJp9rK74lvwbNVZsxxMNbWFLf8NW4ViuB8ml6jOC0ZP3YEuaUhsZuo_ZyHYPvJQEWpkTJH9RCzhkWNxex6zdcNY4eQbBnlnaLvUpriF0=& p=GFsSOfXcbejQ=V61I_92UeXVQp_xOowHBwUwG2Lb40jOCjkv74lgRO8kcxaHSzKS2YA1W4TEu8reAwa2_h0WHVnFEMje59bx3aMn3cV-UZdMpwmh-Hy_OASH-Jvti3DAkHYmYg_2Z1d8ZGnabDGTFFhLGQBUvOcRre4kj37dOQwbloc_JNxKo-Nd7vkGxpHAWwCLmQMsytI68AhN4Wt7HvK2XIwA4zePulcejH5qPKRvfQapqRhZGmzcm63iQrSO-kkWLoKBniNl-iayzp8RKFkbMlHqQ3T08wAjPc_JhEnfTmtokG-jDbkcxFnhaMP_2UVQ7Ntk5hHLfA83HebJRsAvSh8VNBFMSzuJPYdcQ1-CCT7nMIxXNYFxe2wcVAMnkKVQSsEWe2uhGdeGRRFVVgP4rygU_8mmm_YKTUS0wMl2kCA-q4kx-Eh3VuoxGAmI3HCT3bSIlAYy3J257wm07CCj0qxyGooRYgxmwoS-gvvdemFhy42cg9_yvyAsSF_QBaigdtlAj9wnCj6pz-nwJ-iNmLVspfsMIZSBNrwrruFHCnXz5RcrjW_QueyJKBNDSyEeEKj-HX6BUDCNOjXqRCw_j7RVSshGYqq6WK2BzX9cEQdelg22mnYhWsAgHU4ioNP8a-MrIp_YUCRNZj6R09NdyGalLw1uiTVG-VZe6H6cvqAGImxbMwv_1jSywejsOGiwrUL3oowAJQ9qMMYOdYBibHBbGKtp6phlb8Im49q78_i9bmU2GnxIJWbsZrOePR7OSkr7P95TJ1xKQtvL5sIHJlOQH_fSWO1wgXpI0gDLV6HBjOkf2jRziguHb7irGTnnkEapV1OunqhkC1AxMXetDQKaxVhulgjlv3HQCq1fEtZwcO0ThUExJwTG39KeHMDDmT3j1cdasMUL1SHvxIY_RQIbLrSf-0SuxffsI4c3M_S-FZwlLdEvdx-ohLJzDkTK32tvjI38s1QRQ-Vcdp47obO1ErK6kPKm7_HgF3X6Nv8IZRei5YbXMMTi17iVHQEXNL3jEyg_JX29WaVNva9qnPGOfqs01wSHuKV14aSH_KLxmH7Ce18-lgD_iwHOEkMWiHXwEcBCdIhsmemsICvIsuHIZsfj_s3UIyYeyed_EQROo9j_keJnKFHglL3-H_EL2VHoX7_KMVmCQqVub6yOO6NTt8Db4CcW7AMWzoRVXUuvXBoGMeKq_MhmSYrInkTkxeGzwwU-HXWWqwspEJQluvZ9ZzR8kOH__ChFyrtXpEqL-k5hdSOdpZr4r7VQz7g==6& p=AAj8L0ZF5qmA=LJAg9DzaHXvs1KBzutYwhQmrsoMuunFyAGD4IBks7HPg6ztVTrKpJtQkfB8jCJlswrXJ1M7Uv81iu8GoNavJp8jKu6jRmMQNYaSSz1iNK_NOqwwnDtJd-Q3DwWJor3-rDJiBosbOvBwWkPYnBRMNacRMVz4Lz_BF8FkU6-13BS1CWyf7piyKvbsKmt3nFLBDN4Ke567oWsnXzRTEzzuSBtANMitfDHk9cbTfH4ysZz3eCEIr0s23ZwFpf4vtzDRL_bIdYwU6L0UnveJB3e49M-rtzs-wZfLp1yACddOA8weupv-Ya2ubnCrfVy_PNUvHKiEXHGvlqZcJ4k0GdIjBHn0gWlWPHWVV6gST0OuHQ4bmoxl5I9gqQX3YZMRoywkITvCclr8LeSNBm27S6wl3Q0eFu_nES3b0GDW7GinE0uMv-M3fDhS6FzXs-LnpQtgVumCM3kaK_pPe6rdyjTIRGb71aEC-DqF9qIjyaw0f0S_aVy9Bf6pZOZnt-n-5xOOm6Pp7U0oKhvKIRAIO2ceASk5IE5Hq68OJcJQbqXvvoYn6d0SQiZu_KPb9kpir4HcdQvCtEjh_I4ywrAZ8lo8njVX0jAAl3VJKTwYWW0HdoTUnruOp_ildZehqyEByI8nuJU01vVDHBPYdU7zNPAlYSaFnVte5clgTFLvVGHME6BylyxtFNkFBbnJ3x0NdRYPiCaQ5txrJ3elDUc4tAjQOeLC8N4ea4TbQ5Znn-RdNO2UoLB3Z--VQlyNDZMaQymGlxAAponLp4gYQfqfXqQYU5wtY0uIC3k3WWSJidulXwDXLaFn7rjYH9gpR7BS2IxqAgD2CAyBkQiLr5iupc546MQNr4Z8PwBXOrVxvMGMoc_RlU02eaEynxLzxqpsYfZA1QvLjWkE_TSoYqgJ3F6wXzITqIKbfeC6RiMPvyce4izVZa-wLT9PJAJS7hw0Ga9ZdkNR76eiZhjoowjnzmVFo9jWKh60zkwKhtGoH18X9RPZYPS2hG5mgfUE18XCvUpZaUeBp69skCsOsDfLhLqSPhUCsotK_Vr-K919U-m_Ddr4x5r0MPLkJ65i87nWNgDFUCa-8K5BkUFCLI7s6FKG1FPQB_eyGFdWpSVieNytYxArP50_b_whs7AN6emwLNQzG7sXHB13a4liNDod9JpCVcBRdTVTDsF3DBK5YI7aId48-8ujNotTZhVcgFtrKSXdCffxb3Lj6RvxapBpYLWxwCiqAhvBfo4-1v1_9GA_YPYQ=zo& p=LpnoxxlgBSPY=t5Og0slBpHHzPPMknxqk74APSGPwyjnRBnOKZHydmqgtd4NydkuFjFEmkT6LZ02hEmqwtaXwTnxHvVls6miETrU9xDZQPMnCCamnT2Y_sNVBxeifdpE3WwI_cm34A3XrXtTYe2LCovOUbT1rM32-E9Ze75lzbpbuWUidVpeY_Uf_lReABAfyXLFYT0eUOQ72YE6LXDAcVIAqbUZwVFULZowBIAUkKl-zYERKiRDTsGQyE1Z5Ft7d6jBb1P_KJBnjaPVdHwSU4TaY84ZfzTp6mIFiJaFN4JZ5zP1C4ylkO6LovShKclSJvUvy_XKTvX41ApDqxb0gyLZuU16_VLyZfBaJu4DIlJkx6PxmfD6KIfk4jzKHbkGMVnM4mxrY9jxo-FaJIrdMLUgdun9uVIGZ1MaWolnpV25E2bHaby-HEioOUaI2at-pBFFr5Ec1Ba689ddshn6pm_OwAUhF9B3ZEdk57Dnsz16fzfP3pjNS2Y1sF2sNcBKCjIOzvYx_bQo3bI3004GeabuZx42_Zfd5H9lwfXkci7M1xFvC4_FAQh7goWNh9Lp2d1r0jSgmF6F_R5npvQjckwNUws-SxVUee691ZLzh75LXK6_78V0ySmJjIGJf-xtK6y2-f2qIuvy2QG7WEGawUIep8K0xJbx0POgAgwxGHIX2PfNPPQ7m1UmY9SLZIS_HRaAcSMAlYjqPR5S3ZjWeMl59--L2km0F67UN9taV2tQEJERKOs9zvsHr58UC-Tb5k0GEqn2wD4gLu6f0rU2FJBpY1MoCp-m7IvKos7k11AwzkczMIK1FVfZwkAkItq55Jr-nhC30rdp0F5BekKt9RQv1u9dypezZDhNhh-ONtGl74BftYDAwhGiSB2E14PQpGL2mTWShzghSQ9Zraj70jemCqSwEzqoZv-dthc83hrb8OKB2gVi4r6ZQedZ2a5h1VQoUuAeRM11L7Pc-vdPjPLKSm-DcLsYy-ZSauS6U7tJgyDXZYw3f7s7WV9-aPyk1aO4nuy1ALWjTrJLXL_gM5WHWomrW0Bavso-4O4LLsxIAsAKgq2eh6DqU0kPN2sQEAA6vu0Q_RC9XPs5tcLY3WCH4hCOVgeD_fJvVsStFY15nU7KllCBc7Zzeh9L0SCawTGrCyyqo0ymD2D0enTLKJIPvjb2ma7tcOyN-xKfX1ICz_mrwvx3oQFAwCwjx6nTotZOMIUNVm17npOXuxVGvr0WqE0dhSZQeNQ0kK1lVJbXjX5DhrGaT3U8=& p=4OPWuPCF4ZFE=P-fbtyVbJ8dhbnnjEebGH-tIo_sUko6Tlkok_mvN0y-ksJHGexLhwo_wsWKijcOLUenOP9CdwbKqqEuDeqU7QmIFvxhZfa_pz5WPRKGXqNV7qbSCWzoagOGdVnFjgJDSOg2zTsHuz0DY-8fZG1-6qszvBrk7YgOau4mt6KGHdUkQpbfm9JQpfdtIe7ku0oBItwVubiRNN_D6oc3_gQPDPuLjTmpDvQhfdsjU7x5WRjGy44qDwL8dKKBNrEiI8Yf4P0X7jDoIvWYkLooO4-oGv-WUKH7-Oj9F_tpuH0SB6s28ocnI5P72dD28VOuqfNg3a5M6z0ZKzBeqGvmCFYPMLPNy473BpEEDlPO3ljo0cCLD7ODq3g98EVo6RidI3M3SE87fAJOBTr_6O44NIFlgmxnTKp-6sGbGEKKgbe86k2HTpOFWWAoc-SSutFwagAppqdtfneinuIyFH2C3Vml3FotmHOa8FVvqfmfKBEICVCOzI-WlXtBZzDksUHDJ_FXuV5vYrW5OG-Zo6lDtjki-gHO1A1BHh4bW4xuDvWv5s7caD0DoB48LVf3cGq5jqJAAzOVgvNb5J3KLHhu-JOpAttMip8_lXcsc9oi1kvXsEZfYMOtxTFiWAyL_1k_zuJL6av9NNie_kz--8xoWgb4JT3src8qCqi9yTJKfI2NI1UGU7yYcoaQLkMGOd3G4a31NSjxYL7Xu9otv0USqlPM_0qj418M_Dd3cFX3Gn-mGyE0D5__ZxNfpSUhvwecFJQr_TfNU2t0DQUhGoskBFcNni5QrxVQabj4OGZb4ZCLRUX355sPUFEU7KHMiCAccPluq8pOwkI6gZ4nNKTOtqm2yoruoXCd0cdwrhSYTlv1gCeVqr7cy38m3tsgeOAg6TtpuMylaOM3U_wCeX4UyEF6SmDgQMoWbeXA8JkQFz1d63NyHyCfJ9MvY8k9TpFAEVfH3BvO9VGa4azyVu8Ih11tLZgLo6cdxMyGyv30HzYwLLKle9YDD0Hz1TQEYCggZX6zFsoENaCZkIZljTlQY8WwZKehM4iTdbH-vc0U4N-vIUrqudi43VoDJmpIVEODnk_A8mHyZznInHmL4s0vF6PkMZ9bRzYaz40Hsp2R7lh09K3SKKaqq0NCtD1K_8xIAxtPGWPigcVIla1SQNC1wim8u0Zzu6_4CqU1gIsutcKFEMQDxntKCqz9A3MHzFTpgA2-3zCaOTIXQGxUwRqLAekZnrtwbi3qWCQQ8q00UjxqBMA4=vU& p=YbnLYouG_x0U=OQqx_pkirknCqf0K6Z7XV07ohbSwq_QULAqpxl4WAybOTUkXo-19ySak41iQ1OMhi7d98m_YUNRYbW7yxASR907m7Y1JtxPHgflvP1cpfCKjVqG26sD3eblgsjGdKQ8ZQiXBywkytiUdGBfnQkCC64-BUNBKXEJv5thWVCWaOMckEJpwYYcOOnZFiKpiS7Q0r0-_vbL0N28A38g7IBzYPWPXZNNU3KPMzTrpv_gIykv2nAUVXWLCWF3W6HkXi25YGaTKvZp8tcgxvY8uWN1rMu5QL8sFo7Fm2MN2l6KucdXFNE-yfeWB6Njh4PuszkHRzkeqtdNnPh9ZqNbfLu0CwFjudwa28EkCUgew2Tk4qMncLSxXn7nbY_NLiSVlKtjlGbbH60ObLJ64P20QxzHZEJgouvQ-aXsMKC0YfZH6G5_ZduIabG2rDrPduP3at0URSa_sstV0lThXctiA2nCA59ZKrBF6soPr5XOS8VQiO_suj-jkIgqD1eudmvNvBBDgMXcct6EquQp_uV7pcRuV-bAUhOR4DtbC9zOMJlL9PlBjLfKj70073RRefFOb3XrD-EQz_fweG-3czTcCLLw73nuqTapnT3RuhjePAtMR55uaUW3FPit8737tRm2tDS0PzeOUMwdXFfIyh0QIBuTfnQsN_GT3UCxxB-1U6Mr0GAWkKZgOw7GlB_4g1WOmeU0aEdLrEX7WIt2X4rSLf0usfAnUpmV4yxOdny6kkcYFLX99VgKRMmH-GnojB5QnhErF6y0pM7BVjmhxnuVicV_8JPFq9VkasUXkzC6dmk4tbREOmlX77xqXjGaTTzd3TyLeeY0dQIgLddCdaERB9fT5A6hxxQw1CK3E_DiCebXn_dGJEHjMuNfdn-7OUm4KalrlK_CQjHwGpkojzvATwbKYs4r37OrAO8AeuIagLj9LBioHdGqz1SQNKZoZVsGbwWqok7aHDlDY6CDsbDKrQeILAUMLd_PDoDhREwy0W4hh8-kC081nr2InP2whLrDGLZY4WfrdY-ZEPQmY76tdmvC2uneFPMSmWluXtFkYdl-fopkWnzKD9TznEdxokLhhoECwchQp1yLWjA0PB65GjrqJhoJ_FWq6jcU55lFoGeCTcS18S5gJWiJoIz7MYrQz9VZn1xfgrK2TQJVPXp3AuYdkj9rJNe-KxVe4YGiziBzTYbKrllvnsTW3J-T4Zq1wL3GsgBrLwlXNVLM1giSN-QwHxydoSHKQ4FlOvI3u7EQF920=& p=5TptMzLWs9eU=uciQbPpLErmtPT7VrZKgcZLS5bhJ3yikyEKCmE-YD43hikhgmKiAgErLMXclZWUEoBjjZLKA8KKcg1yGwCQUxmwQiVqu6uE57dZs97MLjK0r4K3qcW6RaWDmgGbbT72sgZjAsYwpvDPSYBBmwDiytydefhChASeFkS7GIJLISgI_iPcGN2doPWF07Ek4hyizJoEKXbWQ84thEWOPOg4Il_4FfjNw8eBHP-HDWWqz88g1yrOqiTOCwS5hqttEoaRszpBFlvN_sBTBp9v6ygCtImC1Q33TQnreMKNSSaVMPZSEfSk6co0PjLK15G8xBM_sKt9rCeUaV_nYynqkzmBOchrd3ezxmnp5-RgTWcYAK8aZjk_qFchDA1j1qeqDNik4K-iY3T8hSBHRzge6ShPaS9AC4yqtH5qrPIEgrEGmBvVCxAdZzxBSbVGGSiP2vso_BbQb4I5RTGd0cQuUpTRJdbGY5voDWBlDjlQM_HoAcJ9EAeKwfwG-whQXxBu1026GyZdQ0D4QQglpf8BGAGapnvIq4SiJ1C7ynJ4c4uQjpMVp66GXf3cxBq-b9WGa0zDZalH2tcowLz4WrgQGleeM8EMcldeqDwC8-8FMDAthiuzDvFlhEZtqrh1HyWs5Akny26LPYLPwyFEcFPp_vjGnRURiLnjnVYhWf-3M3LNASpk_7nDq57ohNMHrJlygf5BM75YfU9JbhMxf2QOs63swQZgwS3Ka54FxXt3bOfn-w_NjTpAW9e57szurt5GeSKudf89V9M-eUxyimYNDO7dRDh6-EmyCIUt_6qS88hasxWVGcSYxKAC07hSisEK9W15c5BpZmXris_5epXmeXYUvREL9ciof194FQRsL2inpRRg9osQxLLsTIJis2b4oxrfnZCJ7XpvSMhs2-n4-_KLiIykPOiLoNexq9D-D3eA-Z67ymONmEGkPGn_2WBEDhlSSTjlBhO89vwRioKa52u9yg0AVTwbkHAaht0EHBlrbgJXWXouJucWDqi3cE9EVrU2RLC5NaRWgnVZOh_osW2K9UtuDn7OQSzySh15g0JOnkR3E9SQxZzQwIArsSD2XUjvsfC74uGCbam8-25bgATPbJqCu8lbU0RJpyRefGWB_VlX4x-PUOKl5Oko7doYt2HE6FxsNXi0fljHDHilj5x_ECNRA2M3izRJIi_JqBKQxOZmAL9wUSOF-dlgKlAKsewiMPqGTdhrKKsk=& p=GFsSOfXcbejQ=V61I_92UeXVQp_xOowHBwUwG2Lb40jOCjkv74lgRO8kcxaHSzKS2YA1W4TEu8reAwa2_h0WHVnFEMje59bx3aMn3cV-UZdMpwmh-Hy_OASH-Jvti3DAkHYmYg_2Z1d8ZGnabDGTFFhLGQBUvOcRre4kj37dOQwbloc_JNxKo-Nd7vkGxpHAWwCLmQMsytI68AhN4Wt7HvK2XIwA4zePulcejH5qPKRvfQapqRhZGmzcm63iQrSO-kkWLoKBniNl-iayzp8RKFkbMlHqQ3T08wAjPc_JhEnfTmtokG-jDbkextdao1hcAigvToJKaL_-8MFZL_5hn5bxXq-pjN-brQgprpVPzHZ1qoNpc2oRHvXhPaljtYJ_D4P2nxpcLDpMOCQFr2en_csecrlkmbHWV0b8ea_40hoMnuWCRp_fWKrfspJLgseM9y4lt_vEZ1w2-ng2ejVA89mCPb0jwEmRjY9y1981gvh_I9Fmb4rYDHYi5HmCNgoQM3PBSjeMvN01gwwRlISNVXpRicYg0MsN9o5kmTJBISP-uPDbkyskl6skW08uZ_IAiWhw7u6KV25hCaJTE8UE6kgrnxqHIduoMM5OaZn1pUBWth5etJ9fJNz3WcUxaBBjFGoXPOvn5hAmTDbsjkIhmP_JhOE4fK4hRaJKa27_tkbJLgJwiRz705NIlxyn3VJG7YSdUb4pSfNBKIydgjULVJIgyG9UwuSPHY23FM8BiQiwczu2L-m5BOG-Rcw_3udVhQ_Lgb0aMSLA4qIs9JJ1V9jSpQNfGm5XyDVQNizuYtFcVm4vtgdnafyfePthd2JGt6B8VotYgrvZ0oVYSmCDwu-l3tF8QV7LVlEj4qQtJS3deuVjYCqftd2tYmfG1d7v9Ix2vch7ly-eZTfxtpIIPHA-Aa7YyrDeCjb7DNOd42nybaqSNIk-w1ijtYxZTT9Z1urQGot8bNPj4N0TrzgyVL8qnNKsCSdWvJLjQ-6z6NMmqMzJ1nJDf-LSS2aoFBApqzgX1W-SQiEIjEvCgwZWnppTvrm0X6C8hGKahsn2zAMPdLTlm8HU7taSkWlPGuOAM63VzZxSZI5kHnRox0g4V4MUzxe41sTSgscxeC-HkdurvIiJpELLZ_wX0cKJKO4bvatx0WUjxpcGp-oL7o0hF59csT3FH8Tgjx2JugO8OAiegpv4uPKJxA0rToR2vX2v1Hu9ShO3KyGwsLfEbj3Unotjvu2vBvC5Aei273KVlavuy9vh0mfUbBVM=V& p=GFsSOfXcbejQ=V61I_92UeXVQp_xOowHBwUwG2Lb40jOCjkv74lgRO8kcxaHSzKS2YA1W4TEu8reAwa2_h0WHVnFEMje59bx3aMn3cV-UZdMpwmh-Hy_OASH-Jvti3DAkHYmYg_2Z1d8ZGnabDGTFFhLGQBUvOcRre4kj37dOQwbloc_JNxKo-Nd7vkGxpHAWwCLmQMsytI68AhN4Wt7HvK2XIwA4zePulcejH5qPKRvfQapqRhZGmzcm63iQrSO-kkWLoKBniNl-iayzp8RKFkbMlHqQ3T08wAjPc_JhEnfTmtokG-jDbkd83GXChsHCSFOlNLotUKPGxEabNKaAlZUVcKl0LKWAboofkbOuUJcm1kpRXNJd59TlQ_ZKURdyXhuHWkBThtsaAmZY6jiA4DIrPh0psB8ebkGjbaeg-g53u_71p4weJktY6Fu8QzyIxbaLiKgEn5E8ia9-DGi6B627c4CqydtuGreQyAVPS2Al_NCrtwGuKEuHWGMlaPO8wQpIpQk4M-fJccNsy9hMNaeMT-1vVnXioSQpqZEY4eutgG6B9tN4hT0kzPq8n4c7-LggQiq_oX0jGYhd0VF8ebF-oeNrNWE9JHx_BTOYcCfb7S_atdr9xIR0pP6Kw-tTwNCOlp7FXXyVj_uItWs7IxAVnjY4AUN53MY6OMbFcVY4fcZ00fJetFpJp2JqoweEKH2SLFgZuFr8KOSPomn4OTQ9VHD-37jAMW4uPYrcYb6ae1glwiYIsSFfLguyjN3OuwvBznprSBqEbQYKKd2sB0tZ_SdGGYcLaYuQgOvSlLDYp4P17fPBQqeul5V-ehn8ekIhbA_kZlusgAsVgQciIF7fl9xoFuPnBNbwoEQGG_N41z9FSMfbOX58POHeKSXjvdXD218EYqiD8GfvRK8gaHIpbXkU2A65PJSkiksRsh4TZ_n2e1ynWnAXSWHpgSQuWc0iYt4pjb4LSjnPIbLZQRs3HNkOTtZ_HaskkbHTPH8azUJCQboMzo7wTZI3euG1vq64LL8bBq5g33y0byQ1-dI8B3q2nlRkiZhLkHPgRdYRcHibMkkET_YsF7Ptp_yHU24nbI7hJsz8vuRumV7ERsZbA7vZHtztowdlbsFHgTotiKl0oUXw-DHA3SOgjGJV8vKFMGvhMIKPr4WpQ8VSs2WViq7UefCN3JHSAwySLXMiwSjr5TYiajCh500l3cOXWtgPesCJe6EpgCk-NZTUxrIfakcbrw4Tz74zrx_9FyXqFHYQ3w218zg=l& p=29sMWI0zBeBM=16RlOIvA1yyxpZsxS4JARBRRiMA3cQ2i8evO3iW9jVyqPfK0dZCbR-rqNQ31pEDmhCWzzwQislB9ulaA7cljy-89Xp1HctrcdBr_TdCZknhzJR4AaFGiJejkf3oL6ojwBa4JTf9AerdtVRYOH3S1aPZkaNOXayoj4OtSV3YnBY3k-mQedCrueHRnot26-w50RD7AkZa_Amv6t05-7hlZHm4rZLgzXR3FlI6lRamLxU5XMJXnd_A_k1binT1mvVs8Qs33VerkxelPdlPRh6nlsNMszF2-gj79Zv-hkrSozEIVZ9rdbHtWroS9Vr_g8wowvrMn6o_i_snb2A2hVyiLN2qj5xG7MvK-uIOimaccRmlTHRjl4PB7ylQzTyjFE1w_mcJOHiZdfQE-78NSncWfZkPZmxcV8E81PYqGz5NAgTmdF4OQhxWSsKKIcvLbWfIS_q7ZpeDfwuNgSVblaC5jOE35QPkLL5WX_rxP_nk5KFVM7rk1r5Seh5xxWyzUoomnEIbeYDOegiYDAPHb4YUqwNwHI63d9gmBatDol2lFjIEbLuKW7tYOk-B_8C4OWWFhtrSYrMSQt3ms2QoC7TwWHxqFbKDxaDf5JP8XI4z5EgPTnzR81INxuQP-dP-yc3C2gqtc_eZYHm7Qp4N_9oRgV3RlUyt1-NFplrNpjjRBdWdDFav4Rw8huCz8fGlT-GG-ryVstX2K2UU9VRQUatYbu0E-BB-cpdxbYnv4LkwboHeUW_JEMF2-PI3GnkpVNmNFCG3-n3w5eorJk_-aZ4JqlT-nBRcglH9zzM0TbFCVUaCxYKeag-FNyK3uTKOkRzWJiNx8SeU0CUna8jYhCFjoKGKGrRYGo5PLGkoXkXEKI0UTfVIp9wbKqH2pvojZqj3iez7BFxPhWIeTyU5vlTy4Gw7SV9XP6dmRKwPqxW5VgEgF5DOu5fjEd94oPj3bL02f0gU18Ho0YGoOwx1wkJJ8UIiWDmpF3h45lBPKVhJ7TGygDs7vfyhOas95r0Z8XrnwKcBGfmTBQkU6x7GuRFh9IxNoNugEkrMPfr40fvh-lI_KbKkoT9tSdx76GSnMIRaVrT1P3NLczO0JwaywkgNMOLsTvoSDytTPTpAPEBSrUo-LkuaIc91zfZ0JlKu3qRJT1IDg-trR32tjXOrdNy3-ThfbnqBa0VuPZJcI7MEZpFSMxJc3cYG5JHUqoVCjaQ_IhfedWN8Z902yzc6ctpq_J3KbzgnyDv4nvAWo2mf0qZk=';
let jctqWzBodyArr = []

let bannerIdList = []
let totalTime = 0
let invalidCount = 0
let finishCount = 0
let rewardAmount = 0

///////////////////////////////////////////////////////////////////

!(async () => {

    if(typeof $request !== "undefined")
    {
        $.msg(jsname+': 此脚本不做重写，请检查重写设置')
    }
    else
    {
        if(!(await checkEnv())) {
            return
        }
        
        for(let i=0; i<jctqWzBodyArr.length; i++) {
            let wzBody = jctqWzBodyArr[i]
            await readArticle(wzBody,i)
        }
        
        await getStatus()
        await showmsg()
    }
  

})()
.catch((e) => $.logErr(e))
.finally(() => $.done())

//通知
async function showmsg() {
    
    notifyBody = jsname + "运行通知\n\n" + notifyStr
    
    if (notifyFlag != 1) {
        console.log(notifyBody);
    }

    if (notifyFlag == 1) {
        $.msg(notifyBody);
        if ($.isNode()){await notify.sendNotify($.name, notifyBody );}
    }
}

async function checkEnv() {
    
    if(!jctqWzBody) {
        console.log(`未获取到文章视频body`)
        return false
    }
    
    if(jctqWzBody.indexOf('&') > -1) {
        jctqWzBodyArr = jctqWzBody.split('&')
    } else {
        jctqWzBodyArr.push(jctqWzBody)
    }
    
    if(jctqTimeBody && jctqTimeBody.indexOf('&') > -1) {
        jctqTimeBodys = jctqTimeBody.split('&')
        jctqTimeBody = jctqTimeBodys[0]
    }
    
    let numWzBody = jctqWzBodyArr.length
    console.log(`找到${numWzBody}个文章视频body`)
    
    return true
}

///////////////////////////////////////////////////////////////////

//浏览文章
async function readArticle(wzBody,idx) {
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/v5/article/complete.json'
    let urlObject = populatePostUrl(url,wzBody)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.success == true) {
        finishCount++
        let randomTime = Math.floor(Math.random()*1000)+10000
        let score = result.items.read_score || 0
        rewardAmount += parseInt(score)
        console.log(`浏览第${idx+1}篇文章获得${score}金币，随机延迟${randomTime}ms后刷阅读时长`)
        await $.wait(randomTime)
        if(jctqTimeBody) {
            await updateStayTime(jctqTimeBody)
        } else {
            console.log(`----没有找到时长body，不刷时长，请小心黑号`)
        }
    } else {
        //invalidCount++
        //await removeBody(wzBody)
        console.log(`浏览第${idx+1}篇文章失败：${result.message}`)
    }
}

//更新阅读时长
async function updateStayTime(timeBody) {
    let caller = printCaller()
    let url = 'https://tq.xunsl.com/v5/user/stay.json'
    let urlObject = populatePostUrl(url,timeBody)
    await httpPost(urlObject,caller)
    let result = httpResult;
    if(!result) return
    
    if(result.success == true) {
        totalTime = result.time
        console.log(`----更新阅读时长成功，今天总阅读时长${result.time}秒`)
    } else {
        console.log(`----更新阅读时长失败：${result.message}`)
    }
}

//删除失效body
async function removeBody(wzBody) {
    newBody = $.getdata('jctqWzBody').replace(wzBody,"");
    newBody = newBody.replace("&&","&");
    $.setdata(newBody,'jctqWzBody');
}

//统计运行情况
async function getStatus() {
    notifyStr += `本次运行情况：\n`
    notifyStr += `共阅读了${finishCount}篇文章/视频，获得${rewardAmount}金币，总阅读时长${totalTime}\n`
    //if(invalidCount > 0) notifyStr += `删除了${invalidCount}个无效的body\n`
}

////////////////////////////////////////////////////////////////////
function populatePostUrl(url,reqBody){
    let rndtime = Math.floor(new Date().getTime()/1000)
    let urlObject = {
        url: url,
        headers: {
            'request_time' : rndtime,
            'Host' : 'tq.xunsl.com',
            'device-model' : 'VOG-AL10',
            'device-platform' : 'android',
            'Connection' : 'keep-alive',
            'app-type' : 'jcweather',
        },
        body: reqBody
    }
    return urlObject;
}

function populateGetUrl(url){
    let rndtime = Math.floor(new Date().getTime()/1000)
    let urlObject = {
        url: url,
        headers: {
            'request_time' : rndtime,
            'Host' : 'tq.xunsl.com',
            'device-model' : 'VOG-AL10',
            'device-platform' : 'android',
            'Connection' : 'keep-alive',
            'app-type' : 'jcweather',
        }
    }
    return urlObject;
}

async function httpPost(url,caller) {
    httpResult = null
    return new Promise((resolve) => {
        $.post(url, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(caller + ": post请求失败");
                    console.log(JSON.stringify(err));
                    $.logErr(err);
                } else {
                    if (safeGet(data)) {
                        httpResult = JSON.parse(data,caller);
                        if(logDebug) console.log(httpResult);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

async function httpGet(url,caller) {
    httpResult = null
    return new Promise((resolve) => {
        $.get(url, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(caller + ": get请求失败");
                    console.log(JSON.stringify(err));
                    $.logErr(err);
                } else {
                    if (safeGet(data,caller)) {
                        httpResult = JSON.parse(data);
                        if(logDebug) console.log(httpResult);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function safeGet(data,caller) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        } else {
            console.log(`Function ${caller}: 未知错误`);
            console.log(data)
        }
    } catch (e) {
        console.log(e);
        console.log(`Function ${caller}: 服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
}

function printCaller(){
    return (new Error()).stack.split("\n")[2].trim().split(" ")[1]
}

function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
