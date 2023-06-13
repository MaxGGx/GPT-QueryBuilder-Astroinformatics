import os
import openai
from langchain.utilities import SerpAPIWrapper
from langchain import ConversationChain
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.schema import (
    AIMessage,
    HumanMessage,
    ChatMessage,
    SystemMessage
)

os.environ["SERPAPI_API_KEY"] = "XXX"
os.environ["OPENAI_API_KEY"] = "XXX"
openai.api_key = os.getenv("OPENAI_API_KEY")
search = SerpAPIWrapper()
llm = OpenAI(model="gpt-3.5-turbo", temperature=0.5, max_tokens=60, top_p=1.0, frequency_penalty=0.5, presence_penalty=0.0)
conversation = ConversationChain(llm=llm, verbose=True)

chat = ChatOpenAI(temperature=0)
messages = [
    SystemMessage(content="You are a helpful assistant that translates English to French."),
    HumanMessage(content="I love programming.")
]
chat(messages)

