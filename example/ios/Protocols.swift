//
//  Protocols.swift
//  AwesomeModuleExample
//
//  Created by Igor Parnadjiev on 16.10.23.
//

import Foundation

//Send the InsideAdCallback events
protocol InsideAdCallbackDelegate: AnyObject {
  func insideAdCallbackReceived(data: String)
}
