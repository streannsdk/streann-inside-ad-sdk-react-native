package com.awesomemodule.callbacks

import com.awesomemodule.models.InsideAd

interface CampaignCallback {
    fun onSuccess(insideAd: InsideAd)

    fun onError(error: String?)
}
