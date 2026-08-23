import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  SimpleGrid,
  Heading,
  Container,
  Icon,
  Flex,
  Divider,
  Link,
  Image,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import {
  FaBarcode,
  FaCalculator,
  FaCircle,
  FaDotCircle,
  FaHandshake,
  FaRegComments,
  FaShippingFast,
} from "react-icons/fa";
import { BsFileEarmarkText } from "react-icons/bs";
import { BiShoppingBag } from "react-icons/bi";

function Feature({ text, title, icon, title1, ...rest }) {
  return (
    <Stack align="center" justify="flex-start"  >
      <Box
        maxW={"250"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"} 
      >
        <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Text
            fontSize={"sm"}
            fontWeight={500}
            bg={useColorModeValue("green.50", "green.900")}
            p={2}
            px={3}
            color={"green.500"}
            rounded={"full"}
          >
            {title}
          </Text>
          {icon}
          <Text>{text}</Text>
        </Stack>
      </Box>
    </Stack>
  );
}
function FeaturePoint({ title, text, ...rest }) {
  return (
    <HStack align={"top"}>
      <Box color={useColorModeValue("gray.500", "gray.400")} pt={2}>
        <Icon as={FaCircle} w={2} h={2} />
      </Box>
      <VStack align={"start"}>
        <Text fontWeight={600}>{title}</Text>
        <Text color={useColorModeValue("gray.600", "gray.300")}>{text}</Text>
      </VStack>
    </HStack>
  );
}

export default function Features() {
  return (
    <Container maxW="container.xl" centerContent>
      <Box p={6} id="Feature">
        <Stack align="center" justify="space-between" h="50px">
          <Heading>FEATURES</Heading>
        </Stack>
        <SimpleGrid columns={{ base: 1, sm: 1, lg: 2, xl: 4 }} spacing={5}>
          <Feature
            icon={<Icon as={BsFileEarmarkText} w={10} h={10} />}
            title={"Billing"}
            text={
              " Multiple Payment mode, Sales Return, Sales Order, Delivery Challan, Estimate, Sales,Balance"
            }
          />

          <Feature
            icon={<Icon as={FaBarcode} w={10} h={10} />}
            title={"Barcoding"}
            text={
              "Design custom barcodes,label printing on laser and thermal barcode printer."
            }
          />
          <Feature
            icon={<Icon as={BiShoppingBag} w={10} h={10} />}
            title={"Inventory"}
            text={
              "Purchase, Purchase Return, Stock Analysis, Stock Counting and adjustment etc."
            }
          />
          <Feature
            icon={<Icon as={FaCalculator} w={10} h={10} />}
            title={"Accounting"}
            text={
              "Balance Sheet, Profit and Loss Account, Voucher and Joural Entry, General Ledger etc."
            }
          />
        </SimpleGrid>
      </Box>
      <Container maxW={"7xl"}  >
        <Box
          marginTop={{ base: "1", sm: "5" }}
          display="flex"
          flexDirection={{ base: "column", lg: "row", sm: "column" }}
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center"
          >
            <Box
              width={{ base: "100%", sm: "85%" }}
              zIndex="2"
              marginLeft={{ base: "0", sm: "5%" }}
              marginTop="5%"
            >
              <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                <Image
                  borderRadius="lg"
                  src="RetailPoints.jpg"
                  alt="RetailPoints"
                  objectFit="contain"
                />
              </Link>
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box backgroundSize="20px 20px" opacity="0.4" height="100%" />
            </Box>
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: "3", sm: "0" }}
          >
            <Heading marginTop="1"> 
                Retail Click 
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue("gray.700", "gray.200")}
              fontSize="lg"
            >
              Bizport Solutions has launched{" "}
              <Text as={"span"} fontWeight={700}>
                RETAIL-CLICK!
              </Text>{" "}
              (referred to as “Software”), a power packed bilingual Point of
              Sale (POS) solution for accounting, billing, inventory, business
              information, and customer-relationship management for Indian
              markets.{" "}
              <Text as={"span"} fontWeight={700}>
                The Software is ideally suited for any small, medium, or large
                shop e.g. Garment Stores, footwear outlets, distribution and
                wholesale line, Plywood glass and hardware, music centers,
                electronics, hotels, department-store, bazaar, super-market,
                Sweet-Marts, Auto Spares Dealers, or any type of trader.
              </Text>{" "}
              The Software is built using the latest software technologies. This
              helps in easy and astute development and further enhancement of
              the software
            </Text>
          </Box>
        </Box>
        <Divider marginTop="5" />
        <Text>
          The Software is designed and developed keeping in mind the typical
          requirements of the Indian conditions existing at Stores and shops;
          such as multiple pricing, promotional schemes, customer credit limit
          checks, home delivery, sales-return, free-items, bar-code label
          printing in English and other Indian Languages and a host of
          accounting features used frequently in Indian context.
        </Text>
        <br />
        <Text>
          The Software is essentially the business owner's or stake holders’
          'Business-Partner'. This is because, the software provides very
          valuable information and tips to the owner on how to run his shop in a
          profitable and cost-effective manner, by optimizing the purchases,
          sale-prices, streamlining the ordering just-in-time and keeping
          optimum levels of inventory. A large number of periodic reports gives
          full insight to the owner on whether the day-to-day business
          operations are running as per his/her vision and how to increase its
          efficiency and profitability.
        </Text>
        <br />
        <Text>
          It also tells the owner about the operator performance, fast-moving
          items, daily, monthly and seasonal sales reports, item-wise profit,
          sales analysis, tax-collected, pending home deliveries and market
          valuation of the stock present. In addition, the package provides
          Inventory and Accounting up to balance-Sheet and Profit-and-Loss level
          to the owner.
        </Text>
        <br />
        <Text>
          The software provides multiple sophisticated reports which are very
          useful in knowing the overall status of the business. All these
          reports can be exported in Excel, PDF or MS Word Format.
        </Text>
        <br />
        <Stack justify="space-between">
          <Heading as="h6" size="1xl" 
          color={useColorModeValue("red.800", "red")}>
            General Features:
          </Heading>
        </Stack>
        <Box>
          <FeaturePoint text=" Definitive windows based Multi-user software ideally suited for various commercial enterprises." />
          <FeaturePoint text=" Bilingual Software i.e. the user Interface components including Menus, Dialogues and Reports can be changed from English to one selected Indian language (Currently Marathi) and viceversa with a single key press. All of the Reports are available in English as well as any one of the above Indian languages. Any of the languages supported by the Windows OS can be implemented on request. " />
          <FeaturePoint text="All the screens have been made very User Friendly. Most of the related operations have been clubbed into the same screen. The Main window can hold more than child screen at any moment of time. This enables the user to focus on more than one screen at a time." />
          <FeaturePoint text="Multiple Data Reports for easy Sales and Stock analysis. All reports can be printed on all printers and various stationery sizes.  " />
          <FeaturePoint text="User-friendly wizards. Even a regular operator can operate the system.  " />
          <FeaturePoint text=" Default short cut key options for ease of operation." />
          <FeaturePoint text=" Item searching on Bar code, Item code or Item Name." />
          <FeaturePoint text=" Operator wise authorities to restrict the operator’s work area." />
          <FeaturePoint text=" Export to MS-Word® / EXCEL / PDF facility for all reports." />
          <FeaturePoint text=" Flexible Bill numbering - Daily, Monthly, Yearly or Custom series." />
          <FeaturePoint text="Import Data from Excel utility provides a facility to import Stock items from Excel worksheet to Stock Item Master.  " />
          <FeaturePoint text="Many utilities to configure or parameterize the usage of the application.  " />
          <FeaturePoint text=" Bill Designer – A utility to design the bill as per the user’s requirement. Different bill formats can be saved for one type of bill. Different formats available like – Continuous, Preprinted etc." />
          <FeaturePoint text="Accounting reports such as Balance Sheet, Profit and loss account, Monthly Ledger, Trial Balance, General Ledger etc. are available. These reports enable the user to realize the current position of the business at any point in time." />
        </Box>
        <Stack justify="space-between">
          <Heading as="h6" size="1xl" 
          color={useColorModeValue("red.800", "red")}>
            Billing Features:
          </Heading>
        </Stack>
        <Box>
          <FeaturePoint text="Facility to Design and Print Bills on different type (Continuous or Plain) and sizes of paper (from 3 inches onward)." />
          <FeaturePoint text="Facility to generate customized Bill no. adding prefix or month or year before the Bill no." />
          <FeaturePoint text="Bill printing in Indian Language (Marathi) and/or English with various font styles." />
          <FeaturePoint text="Separate Bill for wholesaler and Retailer.  " />
          <FeaturePoint text="Bar code facility available for the bill entry. At any time user can shift the searching between Item Code, Bar Code and Item Name." />
          <FeaturePoint text="Multiple Payment Modes – Cash / Credit / Credit Card / Cheque / Credit Note. Multiple payments supported against one bill. E.g. customer can pay Rs.100 by Cash, Rs. 100 by Credit Card and Rs. 500 through UPI against a bill of 700. " />
          <FeaturePoint text="Different rounding off option (like 25 Ps., 50 Ps., 1 Rs.) for the bill.  " />
          <FeaturePoint text=" Discount can be given on Item and/or Bill. " />
          <FeaturePoint text=" Tax can be charged on Item and/or Bill. " />
          <FeaturePoint text=" All Rates can be defined for the items. " />
          <FeaturePoint text="Customer saving (M.R.P – Selling Rate) calculation and printing on bill.  " />
          <FeaturePoint text=" Bill suspension and resume facility. No restriction on no. of suspension bill. " />
          <FeaturePoint text="Home Delivery showing Advance amount received and Amount to be received.  " />
          <FeaturePoint text="Previous bill searching based on Bill No, Date, Amount or Customer Name.  " />
          <FeaturePoint text=" Selling Rate or Quantity calculation based on Amount entered by Operator." />
          <FeaturePoint text="Credit details shown at the time of Cash Receipt.  " />
          <FeaturePoint text=" Sales return against the bill or without the bill. Any discount given on the bill is taken care at the time of return. " />
          <FeaturePoint text="Remark option is provided to enter any remark related to particular item’s sale transaction. Remark pops up as soon as the item name is selected if it is already set in the Cash Memo Setup.  " />
          <FeaturePoint text="Delivery Challan facility.  " />
          <FeaturePoint text=" Sales Order facility. " />
        </Box>
        <Stack justify="space-between">
          <Heading as="h6" size="1xl" 
          color={useColorModeValue("red.800", "red")}>
            Inventory Features:
          </Heading>
        </Stack>
        <Box>
          <FeaturePoint text="Item list categorized by Department /Category /Supplier /Salesman /Brand /Article Number/Colour /Size /Material etc." />
          <FeaturePoint text="Stock items can be maintained Batch wise as well as Item wise." />
          <FeaturePoint text="Go-down and shop wise stock maintenance." />
          <FeaturePoint text=" Item wise Minimum/Re-order/Over stock level maintenance." />
          <FeaturePoint text="User definable tax values. " />
          <FeaturePoint text="Direct Entry of Purchase from the Purchase Order. No need to feed data repeatedly. " />
          <FeaturePoint text="On Line profit calculation at the time of purchase entry itself. " />
          <FeaturePoint text="Any Type of Discount and Tax (% or Amount) on Item or Bill can be entered for Purchase Entry. " />
          <FeaturePoint text="Purchase Return against any Purchase or without the same. " />
          <FeaturePoint text=" Goods transfer from Go-down to Shop and Shop to Go-down." />
          <FeaturePoint text="Stock Adjust or Stock Scrap entries to set the stock according to the physical stock. " />
          <FeaturePoint text=" Location / Category / Department wise Item list printing for the purpose of stocktaking." />
          <FeaturePoint text="Physical Stock Entry and Verification and variance report. " />
        </Box>
        <Stack justify="space-between">
          <Heading as="h6" size="1xl" 
          color={useColorModeValue("red.800", "red")}>
            Barcoding Features:
          </Heading>
        </Stack>
        <Box>
          <FeaturePoint
            text="Barcode printing for all the items purchased or for individual items within the purchase.
 "
          />
          <FeaturePoint text="Barcode Templates can be setup for any barcode label size. The format of the templates can be easily modified by the user itself as per requirement. Individual barcodes can be also printed separately. " />
        </Box>{" "}
        <Stack justify="space-between">
          <Heading as="h6" size="1xl" 
          color={useColorModeValue("red.800", "red")}>
            Accounting Features:
          </Heading>
        </Stack>
        <Box>
          <FeaturePoint text="Reports such as Balance sheet, Profit and loss account, Trial Balance, General Account ledger etc. are available. The user can maintain track of all the incomes and expenses accrued or going to accrue." />
          <FeaturePoint text="The bank transactions can be tracked. Bank transactions such as Cash Deposit/Withdrawal or Cheque Deposit/Withdrawal can be entered. " />
          <FeaturePoint text="Reports such as Cash Book and Bank Book are available to track the cash flow within the company." />
          <FeaturePoint text="Bank Reconciliation feature is present. This feature helps the user to maintain personal cash book register and the Bank Book in prefect concurrence. Any bank or user error can be tracked at the earliest." />
        </Box>{" "}
        <Stack justify="space-between">
          <Heading as="h6" size="1xl" 
          color={useColorModeValue("red.800", "red")}>
            Utilities:
          </Heading>
        </Stack>
        <Box>
          <FeaturePoint text="Powerful Data Backup and Restore facility." />
          <FeaturePoint text="Purchase Export Facility. " />
          <FeaturePoint text="Designer for printing of various types of Bills and Receipt." />
        </Box>
      </Container>
    </Container>
  );
}
