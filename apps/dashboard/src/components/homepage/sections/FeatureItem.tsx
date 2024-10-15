import { Flex, Tooltip } from "@chakra-ui/react";
import { CheckCircleIcon, DollarSignIcon } from "lucide-react";
import { Card, Text } from "tw-components";

interface FeatureItemProps {
  text: string | string[];
}

export const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => {
  const titleStr = Array.isArray(text) ? text[0] : text;

  return (
    <Flex gap={2} alignItems="flex-start">
      <CheckCircleIcon className="mt-0.5 size-5" />
      {Array.isArray(text) ? (
        <Flex alignItems="center" justifyItems="center" gap={2}>
          <Text>{titleStr}</Text>
          <Tooltip
            label={
              <Card
                py={2}
                px={4}
                bgColor="backgroundHighlight"
                borderRadius="lg"
              >
                <Text size="label.sm" lineHeight={1.5}>
                  {text[1]}
                </Text>
              </Card>
            }
            p={0}
            bg="transparent"
            boxShadow="none"
          >
            <Flex display={{ base: "none", md: "block" }} mb={-0.5}>
              <DollarSignIcon className="relative top-0.5 size-4 to-blue-500" />
            </Flex>
          </Tooltip>
          <Text
            className="text-muted-foreground"
            minW="max-content"
            display={{ base: "block", md: "none" }}
          >
            {text[1]}
          </Text>
        </Flex>
      ) : (
        <Text>{titleStr}</Text>
      )}
    </Flex>
  );
};
