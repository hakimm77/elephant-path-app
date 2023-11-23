import { IConversation } from "../../utils/types"
import {
    Flex,
    Text,
    Spinner,
} from "native-base";


export const MessageComponent = ({ message }: { message: IConversation}) => {
    
    // useEffect(() => {
    //         cons
    //   }, [message]);

    return (<Flex
        key={message.id as string}
        flexDir="column"
        w="fit-content"
        maxW={"70%"}
        p={2}
        mb={3}
        alignSelf={
            message.role === "assistant" ? "flex-start" : "flex-end"
        }
        borderRadius={10}
        bgColor={message.role === "assistant" ? "#fff" : "#096c7d"}
        borderWidth={1}
        borderColor="#000"
    >
        {message.content === "0L1o2a3d4i5n6g7" ? (
            <Flex flexDir="row" alignItems="center">
                <Spinner color="#444654" size={"sm"} />
                {/* <Text ml={2}>{text}</Text> */}
            </Flex>
        ) : (
            <Flex fontSize={15} w="100%">
                <Text
                    style={{
                        color:
                            message.role === "assistant" ? "#444654" : "#fff",
                        fontFamily: "Quicksand",
                    }}
                >
                    {message.content}
                </Text>
            </Flex>
        )}
    </Flex>
    )
};