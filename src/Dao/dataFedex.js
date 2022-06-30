export const body = `<RateRequest xmlns="http://fedex.com/ws/rate/v13">
    <WebAuthenticationDetail>
      <UserCredential>
        <Key>bkjIgUhxdghtLw9L</Key>
        <Password>6p8oOccHmDwuJZCyJs44wQ0Iw</Password>
      </UserCredential>
    </WebAuthenticationDetail>
    <ClientDetail>
      <AccountNumber>510087720</AccountNumber>
      <MeterNumber>119238439</MeterNumber>
      <Localization>
        <LanguageCode>es</LanguageCode>
        <LocaleCode>mx</LocaleCode>
      </Localization>
    </ClientDetail>
    <Version>
      <ServiceId>crs</ServiceId>
      <Major>13</Major>
      <Intermediate>0</Intermediate>
      <Minor>0</Minor>
    </Version>
    <ReturnTransitAndCommit>true</ReturnTransitAndCommit>
    <RequestedShipment>
      <DropoffType>REGULAR_PICKUP</DropoffType>
      <PackagingType>YOUR_PACKAGING</PackagingType>
      <Shipper>
        <Address>
          <StreetLines></StreetLines>
          <City></City>
          <StateOrProvinceCode>XX</StateOrProvinceCode>
          <PostalCode>64000</PostalCode>
          <CountryCode>MX</CountryCode>
        </Address>
      </Shipper>
      <Recipient>
        <Address>
          <StreetLines></StreetLines>
          <City></City>
          <StateOrProvinceCode>XX</StateOrProvinceCode>
          <PostalCode>06500</PostalCode>
          <CountryCode>MX</CountryCode>
          <Residential>false</Residential>
        </Address>
      </Recipient>
      <ShippingChargesPayment>
        <PaymentType>SENDER</PaymentType>
      </ShippingChargesPayment>
      <RateRequestTypes>ACCOUNT</RateRequestTypes>
      <PackageCount>1</PackageCount>
      <RequestedPackageLineItems>
        <GroupPackageCount>1</GroupPackageCount>
        <Weight>
          <Units>KG</Units>
          <Value>1</Value>
        </Weight>
        <Dimensions>
          <Length>10</Length>
          <Width>10</Width>
          <Height>10</Height>
          <Units>CM</Units>
        </Dimensions>
      </RequestedPackageLineItems>
    </RequestedShipment>
  </RateRequest>`;

export const options = {
  method: "POST",
  Headers: {
    "Content-Type": "text/xml",
    "Accept-Encoding": "gzip, deflate, br",
    Cookie: "siteDC=wtc",
  },
  body: "",
};

export const url = "https://wsbeta.fedex.com:443/xml";
