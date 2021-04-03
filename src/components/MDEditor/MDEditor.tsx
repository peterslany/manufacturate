import { Box, FormLabel, Text } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import "easymde/dist/easymde.min.css";
import { get } from "lodash";
import React, { ReactElement } from "react";
import ReactDOMServer from "react-dom/server";
import { Control, Controller, DeepMap, FieldError } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import SimpleMDEEditor from "react-simplemde-editor";
import { useLocale } from "../../hooks";

interface Props {
  control: Control<Record<string, unknown>>;
  errors?: DeepMap<unknown, FieldError>;
  label: string;
  name: string;
}

function MDEditor({ control, name, errors, label }: Props): ReactElement {
  const { Message } = useLocale();

  const error = get(errors, name)?.message;
  return (
    <>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Box layerStyle={error ? "outline16Error" : "outline16"}>
        <Controller
          control={control}
          name={name}
          rules={{
            required: Message.ERROR_FORM_REQUIRED_FIELD,
          }}
          defaultValue=""
          render={({ onChange, value, ref }) => (
            <SimpleMDEEditor
              onChange={onChange}
              ref={ref}
              value={value}
              options={{
                sideBySideFullscreen: false,
                spellChecker: false,
                previewRender: (text) => {
                  const MD = (
                    <div className="markdown">
                      <ReactMarkdown
                        source={text}
                        renderers={ChakraUIRenderer()}
                      />
                    </div>
                  );

                  return ReactDOMServer.renderToString(MD);
                },
              }}
            />
          )}
        />
      </Box>
      <Text color="red">{error}</Text>
    </>
  );
}

export default MDEditor;
